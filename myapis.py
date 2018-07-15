import pandas as pd
from numpy.lib.scimath import sqrt
import json
from flask import Flask
from flask import request
from flask import Response
from flask import json as json1
from flask_cors import CORS, cross_origin
import geohash as geo

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

item_metadata_file = "/home/anurag/swiggy/items_metadata.csv"
order_file = "/home/anurag/swiggy/order_data.csv"

itm_meta_colnames = ["item_id", "dish_family", "category", "cuisine"]
item_metadata = pd.read_csv(item_metadata_file, sep=",", names=itm_meta_colnames,
                            dtype=object)
item_metadata_dict = item_metadata.set_index('item_id').T.to_dict()

order_col = ["customer_id", "order_id", "restaurant_id", "ordered_time", "pickedup_time", "delivered_time",
             "discount_flag", "customer_geohash", "gmv_total", "items", "post_status"]
order_data = pd.read_csv(order_file, sep=",", names=order_col, dtype=object)


def get_item_category(item):
    if item in item_metadata_dict:
        return item_metadata_dict[item]['category'].split("/")[0:1]
    return None


def get_items_category(items):
    # "[]"
    local_cats = set()
    for item in items[1:-1].split(","):
        _cats = get_item_category(item.strip())
        if _cats:
            for __cat in _cats:
                local_cats.add(__cat)
    return local_cats


def pearsonSimilarity(_my_w_c, _w_c, user_y):
    # 1 -> user X
    # 2 -> user Y
    sum1 = sum([_my_w_c[cat] for cat in _w_c[user_y]])
    sum2 = sum([_w_c[user_y][cat] for cat in _w_c[user_y]])

    sum1Sq = sum([pow(_my_w_c[cat], 2) for cat in _w_c[user_y]])
    sum2Sq = sum([pow(_w_c[user_y][cat], 2) for cat in _w_c[user_y]])

    pSum = sum([_my_w_c[cat] * _w_c[user_y][cat] for cat in _w_c[user_y]])

    # Calculate Pearson score
    num = pSum - (sum1 * sum2 / _w_c[user_y].__len__())
    den = sqrt((sum1Sq - pow(sum1, 2) / _w_c[user_y].__len__()) * (sum2Sq - pow(sum2, 2) / _w_c[user_y].__len__()))
    if den == 0:
        return 0

    r = num / den
    return r


def get_items_from_category(category, _similar_users, _order_data):
    selected_items = set()
    for user in _similar_users:
        this_user_orders = _order_data.query("customer_id == @user and post_status == 'Completed'")

        this_user_uniqueitems_l = set()
        for index, orders in this_user_orders.iterrows():
            for _item in orders['items'][1:-1].split(","):
                this_user_uniqueitems_l.add(_item.strip())
            for this_user_item in this_user_uniqueitems_l:
                it_cat = get_item_category(this_user_item)
                if it_cat and category in it_cat:
                    selected_items.add((this_user_item, orders["customer_geohash"], orders["restaurant_id"]))
    selected_items_l = []
    for sl in selected_items:
        selected_items_l.append({'item': sl[0], 'geohash': sl[1], 'rest_id': sl[2]})
    return selected_items_l


def recommend(userid_x, geohash, flag):
    user_x_id = userid_x
    my_data = order_data.query("customer_id == @user_x_id and post_status == 'Completed'")
    # myuniqueRestaurants = pd.Series(my_data['restaurant_id'].unique())
    # myuniquegeoHash = pd.Series(my_data['customer_geohash'].unique())
    myuniqueitems = pd.Series(my_data['items'].unique())
    myuniqueitems_l = set()
    for itemlist in myuniqueitems:
        for item in itemlist[1:-1].split(","):
            myuniqueitems_l.add(item.strip())

    myuniquecategories = set()
    for item in myuniqueitems_l:
        if item in item_metadata_dict:
            for cat in item_metadata_dict[item]['category'].split("/")[0:1]:
                myuniquecategories.add(cat)

    neighbours = geo.neighbors(geohash)
    uniqueCustList = pd.Series((order_data.query("customer_geohash in @neighbours"))['customer_id'].unique())
    w_c = {}
    w_i = {}
    all_w_c = {}
    all_w_i = {}
    for cust in uniqueCustList:
        if cust != user_x_id:
            custData_orders = order_data.query("customer_id == '" + cust + "' and post_status == 'Completed'")
            w_c[cust] = {}
            w_i[cust] = {}
            all_w_c[cust] = {}
            all_w_i[cust] = {}
            # print custData_orders['items']
            for order in custData_orders['items']:
                if flag == 1:
                    cats = get_items_category(order)
                    cats_df = pd.DataFrame.from_records(zip(cats), columns=["usr_y_category"])

                    for cat in cats_df["usr_y_category"]:
                        if cat in all_w_c[cust]:
                            all_w_c[cust][cat] += 1
                        else:
                            all_w_c[cust][cat] = 1
                    cats_df_matched = cats_df.query("usr_y_category in @myuniquecategories")
                    for matched_cat in cats_df_matched['usr_y_category']:
                        if matched_cat in w_c[cust]:
                            w_c[cust][matched_cat] += 1
                        else:
                            w_c[cust][matched_cat] = 1
                else:
                    items_df = pd.DataFrame.from_records(zip(order[1:-1].split(",")), columns=["usr_y_items"])
                    for it in items_df["usr_y_items"]:
                        if cat in all_w_i[cust]:
                            all_w_i[cust][it] += 1
                        else:
                            all_w_i[cust][it] = 1
                    items_df_matched = items_df.query("usr_y_items in @myuniqueitems_l")
                    for matched_item in items_df_matched['usr_y_items']:
                        if matched_item in w_i[cust]:
                            w_i[cust][matched_item] += 1
                        else:
                            w_i[cust][matched_item] = 1
    if flag == 1:
        w_c = {k: v for k, v in w_c.items() if v}
    else:
        w_i = {k: v for k, v in w_i.items() if v}

    my_w_c = {}
    my_w_i = {}
    # get similar stats for userX
    for usr_x_items in my_data['items']:
        if flag == 1:
            cats = get_items_category(usr_x_items)
            for matched_cat in cats:
                if matched_cat in my_w_c:
                    my_w_c[matched_cat] += 1
                else:
                    my_w_c[matched_cat] = 1
        else:
            items_df = pd.DataFrame.from_records(zip(usr_x_items[1:-1].split(",")), columns=["usr_x_items"])
            for matched_item in items_df['usr_x_items']:
                if matched_item.strip() in my_w_i:
                    my_w_i[matched_item.strip()] += 1
                else:
                    my_w_i[matched_item.strip()] = 1
    similar_user_items = {}
    similar_users = {}
    if flag != 1:
        for user in w_i:
            pc = pearsonSimilarity(my_w_i, w_i, user)
            if pc > 0.5:
                similar_user_items[user] = pc
    else:
        for user in w_c:
            pc = pearsonSimilarity(my_w_c, w_c, user)
            if pc > 0.8:
                similar_users[user] = pc

    recommendationList = []
    if flag == 1:
        total = {}

        simSums = {}

        for cust in similar_users:
            if cust in all_w_c:
                for cat in all_w_c[cust]:
                    total.setdefault(cat, 0)
                    simSums.setdefault(cat, 0)
                    if cat in my_w_c:
                        total[cat] = similar_users[cust]
                    else:
                        total[cat] += all_w_c[cust][cat] * similar_users[cust]
                        simSums[cat] += similar_users[cust]

        # Divide by zero check
        rankings = [(t / simSums[cat], cat) for cat, t in total.items() if simSums[cat] != 0.0]
        rankings.sort()
        rankings.reverse()

        for score, recom_item in rankings:
            recommendationList.append({recom_item: get_items_from_category(recom_item, similar_users, order_data)})
        return json.dumps(recommendationList)

    else:
        total = {}

        simSums = {}

        itemList = []

        for cust in similar_user_items:
            if cust in all_w_i:
                userdata = order_data.query("customer_id == @cust")
                for index, orders in userdata.iterrows():
                    for _item in orders['items'][1:-1].split(","):
                        for it in all_w_i[cust]:
                            if it == _item:
                                itemList.append({'item': _item, 'geohash': orders["customer_geohash"], 'rest_id': orders["restaurant_id"]})
                            total.setdefault(it, 0)
                            simSums.setdefault(it, 0)
                            if it in my_w_i:
                                total[it] = similar_user_items[cust]
                            else:
                                total[it] += all_w_i[cust][it] * similar_user_items[cust]
                                simSums[it] += similar_user_items[cust]

        # Divide by zero check
        rankings = [(t / simSums[cat], cat) for cat, t in total.items() if simSums[cat] != 0.0]
        rankings.sort()
        rankings.reverse()


        final = []

        for score, recom_item in rankings:
            for ob in itemList:
                if recom_item == ob["item"]:
                    final.append(ob)

        return json.dumps(final)



def init():
 print "hello"

@app.route('/recommendation', methods = ['POST'])
@cross_origin()
def api_message():

    if request.headers['Content-Type'] == 'application/json':
        js = (request.json)
	
	print type(request.json)

	result = recommend(js["userid"], js["geohash"], js["flag"])
	
	resp = Response(result, status=200, mimetype='application/json')

    	return resp

    else:
        return "415 Unsupported Media Type ;)"

@app.route('/hello', methods = ['GET'])
def api_hello():
    data = {
        'hello'  : 'world',
        'number' : 3
    }
    js = json1.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')

    return resp


@app.route("/")
def hello():
    return {"data": "hello"}
 
if __name__ == "__main__":
	init()
	app.run(host= '0.0.0.0', debug=True)

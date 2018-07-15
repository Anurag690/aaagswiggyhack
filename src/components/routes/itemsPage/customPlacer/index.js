import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import CustomCard from "./card";
import _ from "lodash";
import { connect } from "react-redux";

function groupBy(array, f) {
  var groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

class CustomPlacer extends Component {
  render() {
    const itemsArr = _.get(this.props.selectedCategoryObj, "itemsArr", []);
    let groupByData = [];
    console.log("%c groupByData ", "background: aqua; color: black", itemsArr);
    if (itemsArr && itemsArr.length) {
      var props = ["item", "geohash", "rest_id"];

      var notNull = _.negate(_.isNull);

      //   const groupByData = _.groupBy(itemsArr, categoryObj => {
      //     return _.find(_.pick(categoryObj, props), notNull);
      //   });
      groupByData = groupBy(itemsArr, function(itemObj) {
        return [itemObj.geohash, itemObj.rest_id, itemObj.item];
      });

      console.log(
        "%c groupByData ",
        "background: lime; color: black",
        groupByData
      );
    }
    console.log(
      "%c groupByData 2222",
      "background: lime; color: black",
      groupByData
    );
    console.log(
      "%c groupByData 2222",
      "background: lime; color: black",
      groupByData.length
    );

    return (
      <div style={{}}>
        <Panel bsStyle="primary">
          <Panel.Heading>Items</Panel.Heading>
          <Panel.Body>
            {itemsArr && itemsArr.length === 0 ? (
              <div> No Items Available </div>
            ) : null}
            {/* {itemsArr && itemsArr.length
              ? itemsArr.map((itemObj, index) => {
                  return <CustomCard obj={itemObj} key={index} />;
                })
              : null} */}
            {groupByData && groupByData.length ? (
              groupByData.map((ObjectKey, index) => {
                return (
                  <CustomCard
                    obj={ObjectKey[0]}
                    count={ObjectKey.length}
                    key={index}
                  />
                );
              })
            ) : (
              <div> saasssdf </div>
            )}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCategoryObj: _.get(state.mainPageReducer, "selectedCategoryObj", {})
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomPlacer);

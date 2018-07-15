import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import CustomCard from "./card";
import _ from "lodash";
import { connect } from "react-redux";

class CustomPlacer extends Component {
  render() {
    const itemsArr = _.get(this.props.selectedCategoryObj, "itemsArr", []);
    return (
      <div style={{}}>
        <Panel bsStyle="primary">
          <Panel.Heading>Items</Panel.Heading>
          <Panel.Body>
            {itemsArr && itemsArr.length === 0 ? (
              <div> No Items Available </div>
            ) : null}
            {itemsArr && itemsArr.length
              ? itemsArr.map((itemObj, index) => {
                  return <CustomCard obj={itemObj} key={index} />;
                })
              : null}
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

import React, { Component } from "react";
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Radio,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import _ from "lodash";

import CardItem from "./cardItem";

import "./styles.css";

class Card extends Component {
  render() {
    return (
      <div>
        {" "}
        <Panel bsStyle="primary">
          <Panel.Heading>Card</Panel.Heading>
          <Panel.Body className="card-panel-body-container">
            {this.props.categoryData &&
              this.props.categoryData.length === 0 && (
                <div> No Category available </div>
              )}
            {this.props.categoryData && this.props.categoryData.length
              ? this.props.categoryData.map((cardObj, index) => {
                  return (
                    <CardItem
                      title={Object.keys(cardObj)[0]}
                      key={index}
                      className={`bg-${index % 5}`}
                    />
                  );
                })
              : null}
          </Panel.Body>
          {/* <Panel.Footer className="text-center">
            <Button bsStyle="success"> Submit </Button>
          </Panel.Footer> */}
        </Panel>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryData: _.get(state.mainPageReducer, "categoryData.value", [])
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);

// export default Card;

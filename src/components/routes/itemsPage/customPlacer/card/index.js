import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import ngeohash from "ngeohash";
import _ from "lodash";

import "./styles.css";
class Card extends Component {
  render() {
    console.log(
      "%c this.props.obj ",
      "background: aqua; color: black",
      this.props.obj
    );
    const latlon123 = ngeohash.decode(_.get(this.props.obj, "geohash", "-"));
    return (
      <div className="item-card-container">
        <div>
          <Col> Item : {_.get(this.props.obj, "item", "-")} </Col>
        </div>
        <div>
          <Col>
            {" "}
            <span>lat &nbsp; {latlon123.latitude} </span>{" "}
            <span>log &nbsp; {latlon123.longitude} </span>{" "}
          </Col>
        </div>
        <div>
          <Col> Restaurant Id {_.get(this.props.obj, "rest_id", "-")} </Col>
        </div>
        <div>
          <Col> Count {_.get(this.props, "count", "-")} </Col>
        </div>
      </div>
    );
  }
}

export default Card;

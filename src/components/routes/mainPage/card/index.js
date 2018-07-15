import React, { Component } from "react";
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Radio,
  Button
} from "react-bootstrap";

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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cardObj, index) => {
              return (
                <CardItem
                  title="abc"
                  key={index}
                  className={`bg-${index % 5}`}
                />
              );
            })}
          </Panel.Body>
          {/* <Panel.Footer className="text-center">
            <Button bsStyle="success"> Submit </Button>
          </Panel.Footer> */}
        </Panel>{" "}
      </div>
    );
  }
}

export default Card;

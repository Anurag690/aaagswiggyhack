import React, { Component } from "react";
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Radio,
  Button
} from "react-bootstrap";

import Card from "./card/index";

import "./styles.css";

class MainPage extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="main-page-container">
          <div className="container">
            <div className="main-page-wrapper">
              <div className="main-page-title">
                <h1>Swiggy Hackathon</h1>
              </div>
              <div className="main-page-form">
                <Panel bsStyle="primary">
                  <Panel.Heading>Input Form</Panel.Heading>
                  <Panel.Body>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Geo Location</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Enter Geo Location"
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Filter Type</ControlLabel> &nbsp;
                      <Radio name="filterType" inline>
                        Category
                      </Radio>{" "}
                      <Radio name="filterType" inline>
                        Item
                      </Radio>{" "}
                    </FormGroup>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>User Id</ControlLabel>
                      <FormControl type="text" placeholder="Enter User Id" />
                    </FormGroup>
                  </Panel.Body>
                  <Panel.Footer className="text-center">
                    <Button bsStyle="success"> Submit </Button>
                  </Panel.Footer>
                </Panel>
              </div>
              <div className="main-page-form">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

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
import mainPageActions from "../../../store/actions/mainPage";
import Card from "./card/index";

import "./styles.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: 1,
      geoLocation: "",
      userId: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGeoLocationValidation = this.handleGeoLocationValidation.bind(
      this
    );
  }
  handleChange(e) {
    if (e) {
      const targetName = e.target.name;
      const value = e.target.value;
      if (targetName !== "filterType") {
        e.preventDefault();
      }
      const formData = {
        geoLocation: { ...this.props.geoLocationObj },
        filterType: { ...this.props.filterTypeObj },
        userId: { ...this.props.userIdObj }
      };
      formData[targetName].value = value;
      //   console.log(
      //     "%c targetName ",
      //     "background: lime; color: black",
      //     targetName
      //   );
      //   console.log("%c value ", "background: lime; color: black", value);
      //   const stateObj = { ...this.state };
      //   stateObj[targetName] = value;
      //   this.setState({ ...stateObj });
      this.props.updateFormData(formData);
    }
  }
  handleGeoLocationValidation(e) {
    if (e) {
      e.preventDefault();
    }
    const geoLocationObj = { ...this.props.geoLocationObj };
    if (geoLocationObj.value && geoLocationObj.value.length !== 7) {
      geoLocationObj.error = {
        isError: true,
        msg: "Geo Location Has To be 7 Characters"
      };
    } else {
      geoLocationObj.error = {
        isError: false,
        msg: ""
      };
    }
    this.props.updateGeoLocationValidation(geoLocationObj);
  }
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
                    <FormGroup
                      controlId="formBasicText"
                      validationState={
                        _.get(this.props.geoLocationObj, "error.isError", false)
                          ? "error"
                          : null
                      }
                    >
                      <ControlLabel>Geo Location</ControlLabel>
                      <FormControl
                        type="text"
                        name="geoLocation"
                        placeholder="Enter Geo Location"
                        onChange={this.handleChange}
                        onBlur={this.handleGeoLocationValidation}
                        value={_.get(this.props.geoLocationObj, "value", "")}
                      />
                      {_.get(this.props.geoLocationObj, "error.msg", "") && (
                        <ControlLabel>
                          {_.get(this.props.geoLocationObj, "error.msg", "")}
                        </ControlLabel>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Filter Type</ControlLabel> &nbsp;
                      <Radio
                        name="filterType"
                        inline
                        onChange={this.handleChange}
                        value="1"
                        selected={_.get(this.props.filterTypeObj, "value", "")}
                      >
                        Category
                      </Radio>{" "}
                      <Radio
                        name="filterType"
                        inline
                        onChange={this.handleChange}
                        value="2"
                        selected={_.get(this.props.filterTypeObj, "value", "")}
                      >
                        Item
                      </Radio>{" "}
                    </FormGroup>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>User Id</ControlLabel>
                      <FormControl
                        type="text"
                        name="userId"
                        placeholder="Enter User Id"
                        value={_.get(this.props.userIdObj, "value", "")}
                        onChange={this.handleChange}
                      />
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

function mapStateToProps(state) {
  return {
    geoLocationObj: _.get(state.mainPageReducer, "formData.geoLocation", {}),
    filterTypeObj: _.get(state.mainPageReducer, "formData.filterType", {}),
    userIdObj: _.get(state.mainPageReducer, "formData.userId", {})
  };
}

const mapDispatchToProps = dispatch => ({
  updateFormData: formData =>
    dispatch(mainPageActions.updateFormData(formData)),
  updateGeoLocationValidation: geoLocationObj =>
    dispatch(mainPageActions.updateGeoLocationValidation(geoLocationObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

// export default MainPage;

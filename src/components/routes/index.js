import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import placard from "../placard";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={placard} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainPage from "./mainPage";
import ItemsPage from "./itemsPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/items" component={ItemsPage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;

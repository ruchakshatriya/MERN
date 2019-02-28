import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import getStore from "../src/store/configureStore";
import LoginComponent from "../src/components/LoginComponent";
import UserListComponent from "../src/components/UserListComponent";
import CreateUserComponent from "../src/components/CreateUserComponent";
import AddPersonInfoComponent from "../src/components/AddPersonInfoComponent";
import UserInfoComponent from "../src/components/UserInfoComponent";
import { Router, Switch, Route } from "react-router-dom";
import history from "../src/history";

class App extends Component {
  render() {
    const store = getStore();
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route path="/userlist" component={UserListComponent} />
            <Route path="/createuser" component={CreateUserComponent} />
            <Route path="/addinfo" component={AddPersonInfoComponent} />
            <Route path="/userinfo" component={UserInfoComponent} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

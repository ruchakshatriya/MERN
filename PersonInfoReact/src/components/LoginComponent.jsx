import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActionCreator from "../../src/actions/users";
import history from "../history";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  dispatchMessage = () => {
    return dispatch =>
      dispatch({
        type: "INVALID_USER",
        message: "Please enter valid User Name and Password"
      });
  };

  onClickLogin = e => {
    e.preventDefault();
    var userName = e.target.username.value;
    var password = e.target.password.value;
    // alert("userName"+userName);
    // console.log("data"+userName);

    if (userName.trim() !== "" && password.trim() !== "") {
      this.props.loginActions.login(userName, password);
    } else {
      this.dispatchMessage();
    }
  };

  componentDidMount() {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("token") !== ""
    ) {
      if (sessionStorage.getItem("RoleId") === "3") {
        history.push("/userinfo");
      } else {
        history.push("/userlist");
      }
    }
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.onClickLogin}
          className="form-horizontal"
          role="main"
        >
          <h2>Login</h2>
          {this.props.message !== "" ? (
            <div className="alert alert-danger">{this.props.message}</div>
          ) : (
            ""
          )}
          <div className="form-group">
            <label htmlFor="userName" className="col-sm-3 control-label">
              User Name
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" name="username" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">
              Password
            </label>
            <div className="col-sm-9">
              <input type="password" className="form-control" name="password" />
            </div>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.users.message
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

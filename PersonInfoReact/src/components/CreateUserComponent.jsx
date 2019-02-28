import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActionCreator from "../../src/actions/users";
import history from "../history";
import LogoutComponent from "../components/LogoutComponent";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: 0
    };
  }

  onChangeRole = e => {
    console.log("Selected role:" + e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  saveData = e => {
    e.preventDefault();
    console.log("name" + e.target.username.value);
    let formData = {
      UserName: e.target.username.value,
      Email: e.target.email.value,
      Password: e.target.password.value,
      RoleId: e.target.roleId.value
    };
    console.log("data:" + JSON.stringify(formData));
    this.props.userActions.createUsers(formData);
  };

  cancel = () => {
    history.goBack();
  };

  componentDidMount() {
    this.props.userActions.getRoles();
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.saveData} className="form-horizontal" role="main">
          <LogoutComponent />
          <h2>Create User</h2>

          {/* <div className="alert alert-danger" />*/}
          <div className="form-group">
            <label htmlFor="userName" className="col-sm-3 control-label">
              User Name
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" name="username" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">
              Email
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" name="email" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">
              Password
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" name="password" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="roleId" className="col-sm-3 control-label">
              Role
            </label>
            <div className="col-sm-9">
              <select
                name="roleId"
                className="form-control"
                value={this.state.roleId}
                onChange={this.onChangeRole.bind(this)}
              >
                <option key="0" value="0">
                  Select
                </option>
                {this.props.roles.map((h, i) => (
                  <option key={h.RoleId} value={h.RoleId}>
                    {h.RoleName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input type="submit" className="fadeIn fourth" value="Save" />
          <input
            type="button"
            className="fadeIn fourth"
            value="Cancel"
            onClick={this.cancel}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.users.roles
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserComponent);

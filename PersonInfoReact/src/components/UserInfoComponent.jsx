import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActionCreator from "../../src/actions/users";
import history from "../history";
import LogoutComponent from "../components/LogoutComponent";

class UserInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "test"
    };
  }

  goToUserList = () => {
    history.push("/userlist");
  };

  addPersonInfo = () => {
    let userData = {
      userId: this.props.userData.UserId
    };

    history.push({
      pathname: "/addinfo",
      state: userData
    });
  };

  editPersonInfo = () => {
    let userData = {
      userId: this.props.userData.UserId,
      PersonUniqueId: this.props.userData.PersonUniqueId
    };

    history.push({
      pathname: "/addinfo",
      state: userData
    });
  };

  componentDidMount() {
    this.props.userActions.getUserInfoFromSession();
  }
  render() {
    return (
      <div className="container">
        <div role="main">
          <LogoutComponent />
          <h2>User Information</h2>
          <div className="form-group">
            <label htmlFor="userName" className="col-sm-3 control-label">
              User Name :{this.props.userData.UserName}
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">
              Email :{this.props.userData.Email}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">
              Password :{this.props.userData.Password}
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="roleId" className="col-sm-3 control-label">
              Role :{this.props.userData.RoleName}
            </label>
          </div>
          {this.props.userData.PersonUniqueId.length !== 0 ? (
            <input
              type="button"
              className="fadeIn fourth"
              value="Edit Personal Information"
              onClick={this.editPersonInfo}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMsg: state.users.successMsg,
  userData: state.users.userData
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoComponent);

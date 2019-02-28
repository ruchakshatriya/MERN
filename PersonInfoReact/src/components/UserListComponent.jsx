import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActionCreator from "../../src/actions/users";
import * as personInfoActionCreator from "../../src/actions/personInfo";
import TableRowComponent from "../components/tableRowComponent";
import history from "../history";
import LogoutComponent from "./LogoutComponent";

class UserListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: ""
    };
  }

  componentDidMount() {
    //Get User List data from Server
    this.props.userActions.getUserList();
  }

  addNewUser = () => {
    history.push("/createuser");
  };

  takeAction = (rowData, action) => {
    //alert("rowdata" + rowData.UserId + "action" + action);

    if (action === "approve") {
      this.props.userActions.approveRejectAction(rowData.UserId, action);
    } else {
      let userData = {};

      if (action === "editPersonInfo") {
        userData = {
          userId: rowData.UserId,
          TempPersonId: rowData.TempPersonId,
          PersonUniqueId: rowData.PersonUniqueId
        };
      } else {
        userData = {
          userId: rowData.UserId
        };
      }
      history.push({
        pathname: "/addinfo",
        state: userData
      });
    }
  };

  onSearch = e => {
    this.setState({
      searchUser: e.target.value
    });
  };

  render() {
    let filterUserList = this.props.users.filter(user => {
      return (
        user.UserName.toLowerCase().indexOf(
          this.state.searchUser.toLowerCase()
        ) !== -1
      );
    });
    return (
      <div className="container">
        <LogoutComponent />
        <div>
          <input
            className="form-control"
            type="text"
            name="searchUser"
            value={this.state.searchUser}
            onChange={this.onSearch}
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div>
          <input
            type="button"
            onClick={this.addNewUser}
            value="+ Add new users"
            style={{ marginTop: "50px" }}
          />
        </div>

        <table className="table table-striped custab">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {!filterUserList ? (
              <tr />
            ) : (
              filterUserList.map((v, idx) => (
                <TableRowComponent
                  key={idx}
                  data={v}
                  selected={this.takeAction.bind(this)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActionCreator, dispatch),
  personInfoActions: bindActionCreators(personInfoActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent);

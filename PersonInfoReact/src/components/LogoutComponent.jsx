import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActionCreator from "../../src/actions/users";

class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: this.props.data
    };
  }

  logout = () => {
    this.props.userActions.logout();
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutComponent);

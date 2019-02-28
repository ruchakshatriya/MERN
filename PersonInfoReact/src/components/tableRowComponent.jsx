import React, { Component } from "react";

class TableRowComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: this.props.data
    };
  }

  approveRequest = () => {
    this.props.selected(this.state.rowData, "approve");
  };

  addPersonInfo = () => {
    this.props.selected(this.state.rowData, "addPersonInfo");
  };

  editPersonInfo = () => {
    this.props.selected(this.state.rowData, "editPersonInfo");
  };

  render() {
    return (
      <tr>
        {/* {Object.keys(this.state.rowData).map(key => {
          return <td key={[key]}>{this.state.rowData[key]}</td>;
        })} */}
        <td key="username"> {this.state.rowData.UserName}</td>
        <td key="email"> {this.state.rowData.Email}</td>
        <td key="role"> {this.state.rowData.RoleName[0]}</td>
        <td className="text-center">
          {this.state.rowData.TempPersonId.length !== 0 ||
          this.state.rowData.PersonUniqueId.length !== 0 ? (
            <button
              type="button"
              className="btn btn-link"
              onClick={this.editPersonInfo}
            >
              Edit Person Info
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-link"
              onClick={this.addPersonInfo}
            >
              Add Person Info
            </button>
          )}
          {sessionStorage.getItem("RoleId") === "1" &&
          this.state.rowData.TempPersonId.length !== 0 ? (
            <button
              type="button"
              className="btn btn-link"
              onClick={this.approveRequest}
            >
              {" "}
              | Approve
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  }
}

export default TableRowComponent;

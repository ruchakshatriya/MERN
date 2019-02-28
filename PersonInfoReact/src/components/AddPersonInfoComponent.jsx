import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as personInfoActionCreator from "../../src/actions/personInfo";
import LogoutComponent from "../components/LogoutComponent";

class AddPersonInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
      age: ""
    };
  }

  calculate_age(e) {
    var dob = new Date(e.target.value);

    this.setState({ dob: new Intl.DateTimeFormat().format(dob.getTime()) });
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
    this.refs.age.value = age;
  }

  saveData = e => {
    e.preventDefault();
    //alert("user" + this.props.location.state.userId);
    console.log("values" + e.target);
    let formData = {
      UserId: this.props.location.state.userId,
      FirstName: e.target.firstName.value,
      MiddleName: e.target.middleName.value,
      LastName: e.target.lastName.value,
      Gender: e.target.gender.value,
      DOB: this.state.dob,
      Age: e.target.age.value,
      FlatNumber: e.target.flatNumber.value,
      SocietyName: e.target.societyName.value,
      StreetName: e.target.street.value,
      City: e.target.city.value,
      State: e.target.state.value,
      Pincode: e.target.pincode.value,
      PhoneNumber: e.target.phoneNumber.value,
      MobileNumber: e.target.mobileNumber.value,
      PhysicalDisability: e.target.physicalDisability.value,
      MaritalStatus: e.target.maritalStatus.value,
      EducationStatus: e.target.educationStatus.value,
      BirthSign: e.target.birthsign.value
    };
    console.log("data:" + JSON.stringify(formData));
    let table = "";
    let uniqueId = "";
    if (
      this.props.location.state.TempPersonId &&
      this.props.location.state.TempPersonId.length !== 0
    ) {
      uniqueId = this.props.location.state.TempPersonId[0];
      table = "Temp";
    } else if (
      this.props.location.state.PersonUniqueId &&
      this.props.location.state.PersonUniqueId.length !== 0
    ) {
      uniqueId = this.props.location.state.PersonUniqueId[0];
      table = "Person";
    }
    this.props.personInfoActions.addEditPersonInfo(formData, table, uniqueId);
  };

  cancel = () => {
    this.props.personInfoActions.clearPersonData();
  };

  componentDidMount() {
    console.log("Get person data for edit");
    let personData = {};
    if (
      this.props.location.state.TempPersonId &&
      this.props.location.state.TempPersonId.length !== 0
    ) {
      personData.UniqueId = this.props.location.state.TempPersonId[0];
      personData.PersonTable = "Temp";
      this.props.personInfoActions.getPersonData(personData);
    } else if (
      this.props.location.state.PersonUniqueId &&
      this.props.location.state.PersonUniqueId.length !== 0
    ) {
      personData.UniqueId = this.props.location.state.PersonUniqueId[0];
      personData.PersonTable = "Person";
      this.props.personInfoActions.getPersonData(personData);
    }
  }

  render() {
    return (
      <div className="container">
        <form className="form-horizontal" role="main" onSubmit={this.saveData}>
          <LogoutComponent />

          <h2>Person Information</h2>
          <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">
              First Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="firstName"
                className="form-control"
                name="firstName"
                defaultValue={
                  this.props.personData ? this.props.personData.FirstName : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="middleName" className="col-sm-3 control-label">
              Middle Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="middleName"
                className="form-control"
                name="middleName"
                defaultValue={
                  this.props.personData ? this.props.personData.MiddleName : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="col-sm-3 control-label">
              Last Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="lastName"
                className="form-control"
                name="lastName"
                defaultValue={
                  this.props.personData ? this.props.personData.LastName : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="col-sm-3 control-label">
              Gender
            </label>
            <div className="col-sm-9">
              <select
                name="gender"
                className="form-control"
                onChange={this.onChangeRole}
                defaultValue={
                  this.props.personData ? this.props.personData.Gender : ""
                }
              >
                <option key="0" value="Male">
                  Male
                </option>

                <option key="1" value="Female">
                  Female
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className="col-sm-3 control-label">
              Date of Birth*
            </label>
            <div className="col-sm-9">
              <input
                type="date"
                id="birthDate"
                className="form-control"
                onChange={this.calculate_age.bind(this)}
                defaultValue={
                  this.props.personData ? this.props.personData.DOB : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age" className="col-sm-3 control-label">
              Age
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="age"
                className="form-control"
                ref="age"
                readOnly
                defaultValue={
                  this.props.personData ? this.props.personData.Age : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="flatNumber" className="col-sm-3 control-label">
              Flat Number
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="flatNumber"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.FlatNumber : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="societyName" className="col-sm-3 control-label">
              Society Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="societyName"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.SocietyName : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="street" className="col-sm-3 control-label">
              Street
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="street"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.StreetName : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="city" className="col-sm-3 control-label">
              City
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="city"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.City : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="state" className="col-sm-3 control-label">
              State
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="state"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.State : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pincode" className="col-sm-3 control-label">
              Pincode
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                id="pincode"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.Pincode : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="col-sm-3 control-label">
              Phone number{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                id="phoneNumber"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.PhoneNumber : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="col-sm-3 control-label">
              Mobile number{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                id="mobileNumber"
                className="form-control"
                defaultValue={
                  this.props.personData
                    ? this.props.personData.MobileNumber
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="physicalDisability"
              className="col-sm-3 control-label"
            >
              Physical Diabilities
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="physicalDisability"
                className="form-control"
                defaultValue={
                  this.props.personData
                    ? this.props.personData.PhysicalDisability
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="maritalStatus" className="col-sm-3 control-label">
              Marital Status
            </label>
            <div className="col-sm-9">
              <select
                name="maritalStatus"
                className="form-control"
                onChange={this.onChangeRole}
                defaultValue={
                  this.props.personData
                    ? this.props.personData.MaritalStatus
                    : ""
                }
              >
                <option key="0" value="Single">
                  Single
                </option>

                <option key="1" value="Married">
                  Married
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="educationStatus" className="col-sm-3 control-label">
              Education Status
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="educationStatus"
                className="form-control"
                defaultValue={
                  this.props.personData
                    ? this.props.personData.EducationStatus
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthsign" className="col-sm-3 control-label">
              Birth Sign
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="birthsign"
                className="form-control"
                defaultValue={
                  this.props.personData ? this.props.personData.BirthSign : ""
                }
              />
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
  personData: state.users.personData
});

const mapDispatchToProps = dispatch => ({
  personInfoActions: bindActionCreators(personInfoActionCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPersonInfoComponent);

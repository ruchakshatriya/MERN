const initialState = {
  loggedUserId: "",
  token: "",
  roles: [],
  users: [],
  successMsg: "",
  message: "",
  userData: { UserName: "", RoleId: "", Email: "", Password: "" },
  personData: {}
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGEDIN":
      // some other logic that reducer wants to execute
      return {
        ...prevState,
        ...{
          token: action.token,
          loggedUserId: action.loggedUserId,
          message: ""
        }
      };
    case "USER_ROLES":
      // some other logic that reducer wants to execute
      return { ...prevState, ...{ roles: action.roles } };
    case "USER_CREATED":
      return {
        ...prevState,
        ...{ successMsg: action.successMsg, users: [] }
      };
    case "RESTORE_USER":
      return {
        ...prevState,
        ...{ userData: action.user }
      };
    case "USER_LIST":
      return { ...prevState, ...{ users: action.users } };
    case "APPROVED":
      return { ...prevState, ...{ users: [] } };
    case "PERSON_DATA":
      return { ...prevState, ...{ personData: action.personData } };
    case "PERSONDATA_ADDED":
      return {
        ...prevState,
        ...{ successMsg: action.successMsg, personData: {}, users: [] }
      };
    case "INVALID_USER":
      return { ...prevState, ...{ message: action.message } };
    case "REQUEST_FAILED":
      return { ...prevState, ...{ message: action.message } };
    case "CLEAR_PERSONDATA":
      return { ...prevState, ...{ personData: {} } };
    case "LOGOUT":
      return {
        ...prevState,
        ...{
          loggedUserId: "",
          token: "",
          roles: [],
          users: [],
          successMsg: "",
          message: "",
          userData: { UserName: "", RoleId: "", Email: "", Password: "" },
          personData: {}
        }
      };
    default: {
      return prevState;
    }
  }
};

export default reducer;

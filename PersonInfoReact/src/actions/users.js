import history from "../history";

export const login = (username, password) => {
  console.log("username" + username + "password" + password);

  return (dispatch, getState) => {
    fetch("http://api.db-ip.com/v2/free/self", {
      method: "GET"
    })
      .then(response => {
        console.log("result data test" + JSON.stringify(response));
        response.json().then(resultStatus => {
          console.log("result data test" + JSON.stringify(resultStatus));
          //Get Login status data
          let loginStatus = {
            UserName: username,
            IpAddress: resultStatus.ipAddress,
            LoginFrom: resultStatus.city,
            DateTime: "2000-01-01T18:30:00.000+00:00"
          };
          console.log("login status" + JSON.stringify(loginStatus));
          fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              UserName: username,
              Password: password,
              loginStatus: loginStatus
            })
          })
            .then(response => {
              console.log("result data" + JSON.stringify(response));
              response.json().then(result => {
                if (result.statusCode === 200) {
                  try {
                    console.log("result data" + result.token);

                    // Add user data(user id and token value) in Application state for further use
                    dispatch({
                      type: "USER_LOGGEDIN",
                      token: result.token,
                      loggedUserId: result.UserId
                    });
                    //Store User data in Session storage
                    sessionStorage.setItem("token", result.token);
                    sessionStorage.setItem("UserId", result.user.UserId);
                    sessionStorage.setItem("RoleId", result.user.RoleId);
                    sessionStorage.setItem("User", JSON.stringify(result.user));
                    // After successful logged in, redirect to UserList screen
                    if (result.user.RoleId === "3") {
                      history.push("/userinfo");
                    } else {
                      history.push("/userlist");
                    }
                  } catch (error) {
                    alert("Error" + error);
                    //Error while fetching user data
                    dispatch({
                      type: "REQUEST_FAILED"
                    });
                  }
                } else {
                  dispatch({
                    type: "INVALID_USER",
                    message: result.message
                  });
                }
              });
            })
            .catch(error => {
              //Error while fetching user data
              dispatch({
                type: "REQUEST_FAILED"
              });
            });
        });
      })
      .catch(error => {
        //Error while fetching user data
        dispatch({
          type: "REQUEST_FAILED"
        });
      });
  };
};

export const getRoles = () => {
  console.log("Get User Roles");

  return (dispatch, getState) => {
    fetch("http://localhost:5050/roles", {
      method: "GET"
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;

              console.log("result data" + resultData);

              dispatch({
                type: "USER_ROLES",
                roles: result.data
              });
              console.log("current state " + JSON.stringify(getState()));
            } catch (error) {
              alert("Error" + error);
              //Error while fetching user data
              dispatch({
                type: "REQUEST_FAILED"
              });
            }
          });
        }
      })
      .catch(error => {
        //Error while fetching user data
        dispatch({
          type: "REQUEST_FAILED"
        });
      });
  };
};

export const createUsers = userData => {
  console.log("Inside Create User");

  return (dispatch, getState) => {
    fetch("http://localhost:5050/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;
              alert("User Successfully Created!");
              console.log("result data" + resultData);
              dispatch({
                type: "USER_CREATED",
                successMsg: "User Successfully Created!",
                userData: result.data
              });
              console.log("current state " + JSON.stringify(getState()));
              history.push("/userlist");
            } catch (error) {
              alert("Error" + error);
              //Error while fetching user data
              dispatch({
                type: "REQUEST_FAILED"
              });
            }
          });
        }
      })
      .catch(error => {
        //Error while fetching user data
        dispatch({
          type: "REQUEST_FAILED"
        });
      });
  };
};

export const getUserList = () => {
  console.log("Get User List");

  return (dispatch, getState) => {
    fetch("http://localhost:5050/user", {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      })
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;

              console.log("result data" + resultData);

              dispatch({
                type: "USER_LIST",
                users: result.data
              });
              console.log("current state " + JSON.stringify(getState()));
            } catch (error) {
              alert("Error" + error);
              //Error while fetching user data
              dispatch({
                type: "REQUEST_FAILED"
              });
            }
          });
        } else {
          dispatch({
            type: "REQUEST_FAILED",
            message: response.message
          });
        }
      })
      .catch(error => {
        //Error while fetching user data
        dispatch({
          type: "REQUEST_FAILED",
          message: "Request failed"
        });
      });
  };
};

export const approveRejectAction = (userId, action) => {
  console.log("userId" + userId + "action" + action);

  return (dispatch, getState) => {
    fetch("http://localhost:5050/personinfo/action", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserId: userId
      })
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;
              alert("Information approved successfully");
              console.log("Action result data" + resultData);

              dispatch({
                type: "APPROVED"
              });
              history.push("/userlist");
            } catch (error) {
              alert("Error" + error);
              //Error while fetching user data
              dispatch({
                type: "REQUEST_FAILED"
              });
            }
          });
        }
      })
      .catch(error => {
        //Error while fetching user data
        dispatch({
          type: "REQUEST_FAILED"
        });
      });
  };
};

export const getUserInfoFromSession = () => {
  return (dispatch, getState) => {
    var userData = JSON.parse(sessionStorage.getItem("User"));
    dispatch({
      type: "RESTORE_USER",
      user: userData
    });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    sessionStorage.clear();
    dispatch({
      type: "LOGOUT"
    });
    history.push("/login");
  };
};

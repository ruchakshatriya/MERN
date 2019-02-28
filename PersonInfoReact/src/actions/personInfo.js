import history from "../history";

export const addEditPersonInfo = (personData, table, uniqueId) => {
  console.log("personData" + personData);

  return (dispatch, getState) => {
    //const appState = getState().u;

    fetch("http://localhost:5050/personinfo/addEdit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserRole: sessionStorage.getItem("RoleId"),
        Table: table,
        UniqueId: uniqueId,
        PersonInfo: personData
      })
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;

              console.log("result data" + resultData);
              alert("Data saved successfully");

              // Add user data(user id and token value) in Application state for further use
              dispatch({
                type: "PERSONDATA_ADDED",
                successMsg: "Record saved successfuly"
              });

              history.push("/userlist");
            } catch (error) {
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

export const getRoles = () => {
  console.log("Get User Roles");

  return (dispatch, getState) => {
    //const appState = getState().u;

    fetch("http://localhost:5050/roles", {
      method: "GET"
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;

              console.log("result data" + resultData);
              //   alert('User len'+userRecord.length);

              // Add user data(user id and token value) in Application state for further use
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

export const getPersonData = criteria => {
  console.log("Get User Roles");

  return (dispatch, getState) => {
    //const appState = getState().u;
    let urldata =
      "uniqueId=" + criteria.UniqueId + "&table=" + criteria.PersonTable;

    fetch("http://localhost:5050/personinfo?" + urldata, {
      method: "GET"
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            try {
              const resultData = result;

              console.log("result data" + resultData);
              //   alert('User len'+userRecord.length);

              // Add user data(user id and token value) in Application state for further use
              dispatch({
                type: "PERSON_DATA",
                personData: result.data
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

export const clearPersonData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_PERSONDATA"
    });
    history.goBack();
  };
};

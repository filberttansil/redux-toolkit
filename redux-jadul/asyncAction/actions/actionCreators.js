const API = "https://jsonplaceholder.typicode.com/users";
function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
}

function fetchUserFailed(errors) {
  return {
    type: FETCH_USERS_FAILED,
    payload: errors,
  };
}

// Async ActionCreator
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get(API)
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchUserFailed(error.message));
      });
  };
};

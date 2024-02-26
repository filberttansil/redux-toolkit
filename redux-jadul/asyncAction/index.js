const redux = require("redux");
const { applyMiddleware } = redux;
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

// ActionTypes
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// ActionCreators
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
const fetchUsers = () => {
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

const initialState = {
  loading: false, // Corrected from true to false
  data: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const store = redux.createStore(userReducer, applyMiddleware(thunkMiddleware));

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());

unsubscribe(); // Unsubscribe from the store

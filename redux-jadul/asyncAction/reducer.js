const initialState = {
  loading: true,
  data: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: false,
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
      };
    default:
      break;
  }
};

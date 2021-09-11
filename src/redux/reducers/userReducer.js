const initialState = {
  user: null,
  loading: true,
  authenticated:false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
      case "SET_USER":
      return {
        ...state,
        authenticated: true,
        user:action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

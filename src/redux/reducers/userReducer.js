const initialState = {
  user: null,
  loading: true,
  authenticated:false,
  childs:[]
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
      case "SET_CHILDS":
      return {
        ...state,
        childs:action.payload
      };

    default:
      return state;
  }
};

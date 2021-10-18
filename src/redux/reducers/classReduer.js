const initialState = {
    allClasses: [],
    loading: true,
  };
  
  export const classReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ALL_CLASSES":
        return {
          ...state,
          allClasses: action.payload,
        };
      default:
        return state;
    }
  };
  
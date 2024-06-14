const initialState = {
  city: null,
  language: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_SEARCH":
      return {
        ...state,
        ...action.inputData,
      };
    default:
      return state;
  }
};

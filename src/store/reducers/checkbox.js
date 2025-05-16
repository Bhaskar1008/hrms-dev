import * as actionTypes from "../actions/actionTypes";

const initialState = {
  checkboxStateInfo: {},
};

const checkboxState = (state, action) => {
  return {
    ...state,
    checkboxStateInfo: action.payload,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHECKBOX_INFO:
      return checkboxState(state, action);

    default:
      return state;
  }
};

export default reducer;

import { SAVE_REPRESENTATIVE_DETAILS } from "../actions/actionTypes";

const initialState = {
  representativeDetails: {},
};

const representativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REPRESENTATIVE_DETAILS:
      return {
        ...state,
        representativeDetails: action.payload,
      };
    default:
      return state;
  }
};

export default representativeReducer;
import { UserTypes } from "./user-types";

// this is used to set the state that the reducer is looking to use as a parameter
// doesn't have state when its initialized, so we set it here
const INITIAL_STATE = {
  currentBUser: null,
};
// state = INITIAL_STATE is using default parameters from ES6, basically if state doesn't exist (like when its first initialized)
// it will fall back on the INITIAL_STATE variable instead
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentBUser: action.payload,
      };
    }
    default:
      return state;
  }
};
export default userReducer;

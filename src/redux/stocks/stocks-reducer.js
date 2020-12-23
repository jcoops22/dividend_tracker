import { StocksTypes } from "./stocks-types";

// this is used to set the state that the reducer is looking to use as a parameter
// doesn't have state when its initialized, so we set it here
const INITIAL_STATE = {
  stocks: null,
  tickerData: null,
  showDrawer: false,
  reload: false,
};
// state = INITIAL_STATE is using default parameters from ES6, basically if state doesn't exist (like when its first initialized)
// it will fall back on the INITIAL_STATE variable instead
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StocksTypes.SET_STOCKS: {
      return {
        ...state,
        stocks: action.payload,
      };
    }
    case StocksTypes.SET_TICKER: {
      return {
        ...state,
        tickerData: action.payload,
      };
    }
    case StocksTypes.SET_RELOAD: {
      return {
        ...state,
        reload: action.payload,
      };
    }
    default:
      return state;
  }
};
export default userReducer;

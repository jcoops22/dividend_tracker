import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import stocksReducer from "./stocks/stocks-reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //local storage

// make persistent data, stored in local storage in browser
const persistConfig = {
  // the key represents the point at which you want to start storing everything, in this case the
  // 'root' reducer
  key: "root",
  // uses whatever storage objects we imported
  storage,
  // whitelist is an array of string names of the reducers that we want to store
  // whitelist: ["stocks", "user"],
};

const rootreducer = combineReducers({
  user: userReducer,
  stocks: stocksReducer,
});

export default persistReducer(persistConfig, rootreducer);

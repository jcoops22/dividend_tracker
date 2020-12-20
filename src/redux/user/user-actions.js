import { UserTypes } from "./user-types";

export const setCurrentUser = (user) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});
export const setCurrentUserStocks = (stocks) => ({
  type: UserTypes.SET_CURRENT_USER_STOCKS,
  payload: stocks,
});

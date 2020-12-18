import { StocksTypes } from "./stocks-types";

export const setStocks = (stocks) => ({
  type: StocksTypes.SET_STOCKS,
  payload: stocks,
});

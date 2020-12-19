import { StocksTypes } from "./stocks-types";

export const setStocks = (stocks) => ({
  type: StocksTypes.SET_STOCKS,
  payload: stocks,
});

export const setTickerData = (data) => ({
  type: StocksTypes.SET_TICKER,
  payload: data,
});

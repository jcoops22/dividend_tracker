import { StocksTypes } from "./stocks-types";

export const setStocks = (stocks) => ({
  type: StocksTypes.SET_STOCKS,
  payload: stocks,
});

export const setTickerData = (data) => ({
  type: StocksTypes.SET_TICKER,
  payload: data,
});

export const setReload = (bool) => ({
  type: StocksTypes.SET_RELOAD,
  payload: bool,
});

export const setShowAllDivs = (obj) => ({
  type: StocksTypes.SHOW_ALL_DIVS,
  payload: obj,
});

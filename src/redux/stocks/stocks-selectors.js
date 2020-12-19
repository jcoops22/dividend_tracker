import { createSelector } from "reselect";

const selectStocks = (state) => state.stocks;

export const selectAllStocks = createSelector(
  [selectStocks],
  (stocks) => stocks.stocks
);
export const selectTickerData = createSelector(
  [selectStocks],
  (stocks) => stocks.tickerData
);

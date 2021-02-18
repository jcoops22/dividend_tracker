import { createContext } from "react";

const StocksContext = createContext({
  stocks: [
    { name: "My stock", ticker: "mys" },
    { name: "fooo", ticker: "gba" },
  ],
});

export default StocksContext;

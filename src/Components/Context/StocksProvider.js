import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../Firebase/firebase";

// CONTEXT
export const StocksContext = createContext({
  stocks: null,
  getStocks: () => {},
  loading: false,
  tickerData: null,
  showAddForm: false,
  showAllDivs: { show: false, payouts: [], stock: {} },
  showAllDivsAction: () => {},
  setTickerDataAction: () => {},
});

// PROVIDER
const StocksProvider = ({ children }) => {
  const [stocks, setStocks] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllDivs, setShowAllDivs] = useState({
    show: false,
    payouts: [],
    stock: null,
  });
  const [loading, setLoading] = useState(false);
  const showAllDivsAction = (obj) => setShowAllDivs(obj);
  const [tickerData, setTickerData] = useState(null);
  const setTickerDataAction = (data) => setTickerData(data);

  // get all of the stocks from firebase and set to local storage if not there
  const getStocks = async () => {
    setLoading(true);
    if (window.localStorage.getItem("stocks")) {
      setLoading(false);
      setStocks(JSON.parse(window.localStorage.getItem("stocks")));
    } else {
      const stocksCollectionRef = firestore.collection("symbols");
      let res = await stocksCollectionRef
        .get()
        .then((data) => {
          let dataStocks = data.docs[0].data().symbols;
          setStocks(dataStocks);
          console.log(typeof dataStocks);
          setLoading(false);
          return dataStocks;
        })
        .then((data) => {
          // set as localStorage
          window.localStorage.setItem("stocks", JSON.stringify(data));
        })
        .catch((err) => {
          return {
            message: err.message,
          };
        });
    }
  };

  useEffect(() => {}, [stocks]);

  return (
    <StocksContext.Provider
      value={{
        getStocks,
        loading,
        stocks,
        showAllDivs,
        tickerData,
        showAllDivsAction,
        setTickerDataAction,
        showAddForm,
        setShowAddForm,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

export default StocksProvider;

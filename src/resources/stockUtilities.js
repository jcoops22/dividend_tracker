import { firestore } from "../Components/Firebase/firebase";
import axios from "axios";
import { nas } from "../resources/nyseOBJ";

export const updateStocks = () => {
  // let ref = firestore.collection("symbols");
  // ref
  //   .get()
  //   .then((data) => {
  //     return data.docs.map((doc) => {
  //       return doc.data();
  //     });
  //   })
  //   .then((obj) => {
  //     // console.log(obj[0].symbols);
  //     let nyse = obj[0].symbols.map((stock) => {
  //       return {
  //         name: stock["Company Name"],
  //         ticker: stock["ACT Symbol"],
  //       };
  //     });
  //     let adjusted = nas.map((stock) => {
  //       return {
  //         name: stock["Company Name"],
  //         ticker: stock["Symbol"],
  //       };
  //     });
  // console.log(adjusted.concat(nyse));
  // ref.doc().set({
  //   symbols: adjusted.concat(nyse),
  // });
  // });
  // ref.doc().set({
  // })
};
const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
export const makeTodaysDate = () => {
  const now = new Date();
  let year = now.getFullYear();
  let month = addZero(now.getMonth() + 1);
  let day = now.getDate();
  return `${year}-${month}-${day}`;
};
// format data to month * day * year
export const formatDateData = (data) => {
  if (data === "No data" || data === "None") {
    return "No Data";
  }
  let year = data.slice(2, 4);
  let month = data.slice(5, 7);
  let day = data.slice(8, 10);

  // console.log(data, year, month, day);
  return `${month}/${day}/${year}`;
};

// get the users added stocks
export const getUserStocks = async (userID) => {
  let ref = firestore.doc(`users/${userID}`);

  let arr = await ref.get().then((data) => {
    return data.data().stocks;
  });
  return arr;
};

// API calls to get data for requested stock
export const getTickerInfo = async (ticker, timeInterval) => {
  // intervals options: 1, 5, 15, 30, 60
  let interval = timeInterval;
  let api_KEY = "3M8136KILLJ20M9K";
  // let currentInfo = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${api_KEY}`;
  let currentInfo = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}min&apikey=${api_KEY}`;
  let overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${api_KEY}`;
  // OVERVIEW API CALL
  let overviewData = await axios
    .get(overview)
    .then((data) => {
      if (data.data.Note) {
        console.log(data.data.Note);
        return {
          yield: "No data",
          divPerShare: "No data",
          exDivDate: "No data",
          payDivDate: "No data",
        };
      } else {
        // console.log("All data", data);
        const {
          DividendYield,
          DividendPerShare,
          DividendDate,
          ExDividendDate,
        } = data.data;

        return {
          ticker: ticker,
          yield: DividendYield,
          divPerShare: DividendPerShare,
          exDivDate: ExDividendDate,
          payDivDate: DividendDate,
        };
      }
    })
    .catch((err) => {
      console.log("There was a problem getting the data", err.message);
      return {
        yield: "No data",
        divPerShare: "No data",
        exDivDate: "No data",
        payDivDate: "No data",
      };
    });
  // TIME SERIES API CALL
  let seriesData = await axios
    .get(currentInfo)
    .then((data) => {
      // console.log(data);
      if (data.data.Note) {
        console.log("Timeout occurred, please try again in 3-5 minutes");
        return {
          yield: "No data",
          divPerShare: "No data",
          exDivDate: "No data",
          payDivDate: "No data",
        };
      }
      let time_series_arr = Object.entries(
        data.data[`Time Series (${interval}min)`]
      );
      // let time_series_arr = Object.entries(data.data["Time Series (Daily)"]);
      let obj = time_series_arr.map((arr) => {
        return {
          lastUpdated: arr[0],
          value: "$" + arr[1]["4. close"].slice(0, -2),
        };
      });
      return {
        ...obj,
        value: obj[0].value,
        updated: new Date().getTime(),
      };
    })
    .catch((err) => {
      // console.log(
      //   "There was a problem getting the interval data,",
      //   err.message
      // );
      return {
        lastUpdated: "No Data",
        value: "Data Not Available",
      };
    });
  // console.log({
  //   ...overviewData,
  //   timeDate: seriesData,
  //   value: seriesData.value,
  // });
  return {
    ...overviewData,
    timeDate: seriesData,
    value: seriesData.value,
  };
};

// add stock to users stock list
export const addStock = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`);
  let currentUserObj = await ref.get().then((data) => data.data());

  let updatedStocksArray = await ref
    .get()
    .then((data) => {
      let newArr = [stock];
      data.data().stocks.forEach((s) => {
        if (s.ticker === stock.ticker) {
          alert("Stock already exists in your list");
          return;
        } else {
          newArr.push(s);
        }
      });
      return newArr;
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });
  // take current user object and update the stocks array property
  let updatedObj = {
    ...currentUserObj,
    stocks: updatedStocksArray,
  };
  // console.log(updatedStocksArray);
  // console.log(updatedObj);
  // update the user's stocks
  ref.set({
    ...updatedObj,
  });

  return updatedStocksArray;
};
// delete stock from users list of stocks
export const deleteStock = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`);
  let currentUserObj = await ref.get().then((data) => data.data());
  let updatedStocksArray = await ref
    .get()
    .then((data) => {
      return data.data().stocks.filter((s) => {
        return s.ticker !== stock.ticker;
      });
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });
  // take current user object and update the stocks array property
  let updatedObj = { ...currentUserObj, stocks: updatedStocksArray };
  // console.log(updatedStocksArray);
  // console.log(updatedObj);
  // update the user's stocks
  ref.set({
    ...updatedObj,
  });
  return updatedStocksArray;
};

//Archive/Mark stock as sold to retain history but not show as an active dividend paying stock
export const markStockAsSold = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`); //reference the users data
  let currentUserObj = await ref.get().then((data) => data.data());
  let updatedStockArr = await ref //get their stocks array
    .get()
    .then((data) => {
      return data.data().stocks.map((s) => {
        return s.ticker === stock.ticker
          ? {
              ...s,
              isSold: stock.isSold, //update the isSold value from stock object passed in
            }
          : s;
      });
    })
    .then((data) => {
      let updatedObj = { ...currentUserObj, stocks: data }; //prepare object to save
      ref.set({
        ...updatedObj, //update the existing object
      });
      return data;
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });
  //filter out the stock we just updated to return to client
  let updatedStock = updatedStockArr.filter((s) => {
    return stock.ticker === s.ticker;
  });

  // console.log(updatedStock);
  return updatedStock; //return stock to be used to notify client of the update
};

export const updateStockDividend = async (userID, stock, payout) => {
  let ref = firestore.doc(`users/${userID}`);
  let currentUserObj = await ref.get().then((data) => data.data());
  let updatedStockArr = await ref
    .get()
    .then((data) => {
      return data.data().stocks.map((s) => {
        return s.ticker === stock.ticker
          ? {
              ...s,
              payouts: payout.sort((a, b) => (a.payDate < b.payDate ? 1 : -1)), //sort chonologically by date decending
            }
          : s;
      });
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });
  // console.log(currentUserObj);
  // console.log(updatedStockArr);
  let updatedObj = { ...currentUserObj, stocks: updatedStockArr };

  ref.set({
    ...updatedObj,
  });
  console.log(
    "from utilities--UpdateStocksDividens new payout added: ",
    updatedStockArr
  );
  return updatedStockArr;
};

// get the dividends history
export const getStockDividends = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`);
  let updatedStockArr = await ref
    .get()
    .then((data) => {
      return data.data().stocks.filter((s) => {
        return s.ticker === stock.ticker;
      });
    })
    .then((data) => {
      // console.log(data[0].payouts);
      return data[0].payouts;
    })
    .catch((err) => {
      console.log(err);
      return {
        message: err.message,
      };
    });
  console.log("from utilities--GETStockDividend:", updatedStockArr);
  return updatedStockArr;
};

// delete incorrectly entered dividends
export const deleteDividend = async (userID, stock, id) => {
  let ref = firestore.doc(`users/${userID}`);
  let updatedStockArr = await ref
    .get()
    .then((data) => {
      return data.data().stocks.filter((s) => {
        return s.ticker === stock.ticker;
      });
    })
    .then((data) => {
      // console.log(data[0].payouts[index]);
      return data[0].payouts.filter((pay) => pay.created !== id);
      // return data[0].payouts;
    })
    .catch((err) => {
      console.log(err);
      return {
        message: err.message,
      };
    });
  console.log("From utilities-- deleted stocks new array", updatedStockArr);
  return updatedStockArr;
};

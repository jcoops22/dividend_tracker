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
export const formatDateData = (data) => {
  if (data === "No data" || data === "None") {
    return "No Data";
  }
  let year = data.slice(0, 4);
  let month = data.slice(5, 7);
  let day = data.slice(8, 10);

  // console.log(data, year, month, day);
  return `${month}/${day}/${year}`;
};
export const getUserStocks = async (userID) => {
  let ref = firestore.doc(`users/${userID}`);

  let arr = await ref.get().then((data) => {
    return data.data().stocks;
  });
  return arr;
};

export const getTickerInfo = async (ticker, timeInterval) => {
  // intervals options: 1, 5, 15, 30, 60
  let interval = timeInterval;
  let api_KEY = "3M8136KILLJ20M9K";
  let currentInfo = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}min&apikey=${api_KEY}`;
  let overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${api_KEY}`;
  // OVERVIEW API CALL
  let overviewData = await axios
    .get(overview)
    .then((data) => {
      if (data.data.Note) {
        return {
          yield: "No data",
          divPerShare: "No data",
          exDivDate: "No data",
          payDivDate: "No data",
        };
      } else {
        console.log("All data", data);
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
      if (data.data.Note) {
        console.log("Timeout occurred");
        return {
          yield: "No data",
          divPerShare: "No data",
          exDivDate: "No data",
          payDivDate: "No data",
        };
      }
      let time_series_arr = Object.entries(data.data["Time Series (5min)"]);
      let obj = time_series_arr.map((arr) => {
        return {
          lastUpdated: arr[0],
          value: "$" + arr[1]["4. close"].slice(0, -2),
        };
      });
      return {
        ...obj,
        value: obj[0].value,
      };
    })
    .catch((err) => {
      console.log(
        "There was a problem getting the interval data,",
        err.message
      );
      return {
        lastUpdated: "No Data",
        value: "Data Not Available",
      };
    });
  console.log({
    ...overviewData,
    timeDate: seriesData,
    value: seriesData.value,
  });
  return {
    ...overviewData,
    timeDate: seriesData,
    value: seriesData.value,
  };
};

export const addStock = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`);
  let currentUserObj = await ref.get().then((data) => data.data());

  let updatedStocksArray = await ref.get().then((data) => {
    let newArr = [stock];
    data.data().stocks.forEach((s) => {
      if (s.ticker !== stock.ticker) {
        newArr.push(s);
      } else {
        console.log("already exists in stocks");
        return;
      }
    });
    return newArr;
  });
  // take current user object and update the stocks array property
  let updatedObj = { ...currentUserObj, stocks: updatedStocksArray };
  console.log(updatedStocksArray);
  console.log(updatedObj);
  // update the user's stocks
  ref.set({
    ...updatedObj,
  });
};

export const deleteStock = async (userID, stock) => {
  let ref = firestore.doc(`users/${userID}`);
  let currentUserObj = await ref.get().then((data) => data.data());

  let updatedStocksArray = await ref.get().then((data) => {
    return data.data().stocks.filter((s) => {
      return s.ticker !== stock.ticker;
    });
  });
  // take current user object and update the stocks array property
  let updatedObj = { ...currentUserObj, stocks: updatedStocksArray };
  console.log(updatedStocksArray);
  console.log(updatedObj);
  // update the user's stocks
  ref.set({
    ...updatedObj,
  });
};

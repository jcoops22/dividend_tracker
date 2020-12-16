import { firestore } from "../Components/Firebase/firebase";
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

export const getUserStocks = async (userID) => {
  let ref = firestore.doc(`users/${userID}`);

  let arr = await ref.get().then((data) => {
    return data.data().stocks;
  });
  return arr;
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
  // take current user object and update the stocks property
  let updatedObj = { ...currentUserObj, stocks: updatedStocksArray };
  console.log(updatedStocksArray);
  console.log(updatedObj);
  // update the user's stocks
  ref.set({
    ...updatedObj,
  });
};

import { firestore } from "../Components/Firebase/firebase";
import { nas } from "../resources/nyseOBJ";

let currentArr = [];

export const updateStocks = () => {
  let ref = firestore.collection("symbols");

  ref
    .get()
    .then((data) => {
      return data.docs.map((doc) => {
        return doc.data();
      });
    })
    .then((obj) => {
      currentArr = obj[0].symbols;
      let adjusted = nas.map((stock) => {
        return {
          // name: stock["Company Name"],
          // ticker: stock["ACT Symbol"],
          name: stock["Company Name"],
          ticker: stock["Symbol"],
        };
      });
      console.log(adjusted);

      // ref.doc().set({
      //   symbols: adjusted,
      // });
    });
  // ref.doc().set({

  // })
};

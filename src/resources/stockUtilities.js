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

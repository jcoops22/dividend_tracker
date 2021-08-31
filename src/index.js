import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StocksProvider from "./Components/Context/StocksProvider";
import UserProvider from "./Components/Context/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <StocksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StocksProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

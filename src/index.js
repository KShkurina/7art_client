import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import "./index.css";

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

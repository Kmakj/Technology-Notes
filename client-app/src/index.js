import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-browser-router";
import "./index.css";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";

const defaultState = {
  appName: "technology-notes",
  articles: null
};

const reducer = function(state = defaultState, action) {
  return state;
};

const reduxStore = createStore(reducer);

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

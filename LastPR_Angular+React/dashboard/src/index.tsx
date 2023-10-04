import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthUser } from "./store/action-creators/userActions";
import { getAccessToken } from "./helpers/tokenHelper";

const token = getAccessToken();
if (token) {
  AuthUser(token, "Loaded from local storrage.", store.dispatch);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={5000} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

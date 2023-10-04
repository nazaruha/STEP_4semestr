import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from './services/api-user-services';
import { AuthUser } from './store/action-creators/userActions';

const token = getAccessToken();
if (token) { // якщо він є\існує
  AuthUser(token, "Loaded from storage.", store.dispatch);  // крч дає нам можливість не загубити токен залогіненого юзера при обновленні сторінки
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/*Need to work with react-router-dom*/}
        <ToastContainer autoClose={3000} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

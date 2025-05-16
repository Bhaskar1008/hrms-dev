import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
// import rootreducer from './store/reducers/index';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// import { createStore, applyMiddleware,compose } from 'redux';
import rootIndex from "./store/root_index";

// import thunk from 'redux-thunk';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

// const store = createStore(rootreducer,composeEnhancers(
//   applyMiddleware(thunk)
// ));
const { store, persistor } = rootIndex;

ReactDOM.render(
  <Provider store={store} id="root">
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

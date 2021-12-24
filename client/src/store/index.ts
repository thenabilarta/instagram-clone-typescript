import { applyMiddleware, createStore, compose } from "redux";
import RootReducer from "./reducers";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  composeEnhancer(applyMiddleware(promiseMiddleware, thunk))
);

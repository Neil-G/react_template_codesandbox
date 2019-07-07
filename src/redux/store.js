import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import reducers from "./reducers";
import logger from "redux-logger";

const environment = process.env.NODE_ENV || "development";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  environment === "production"
    ? createStore(combineReducers(reducers))
    : createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(logger))
      );

export default store;

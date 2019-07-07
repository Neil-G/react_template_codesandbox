import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import configureReducers from "./configureReducers";
import storeBranches from "./storeBranches";
import logger from "redux-logger";

const reducers = configureReducers(storeBranches);
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

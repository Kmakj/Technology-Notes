import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";

export const reduxStore = createStore(reducer, getMiddleware());

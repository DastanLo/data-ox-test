import {applyMiddleware, createStore, Store} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";
import {Action, DispatchType, IState} from "../interfaces";
import {localStorageMiddleware} from "../config/localStorage";


const middlewares = [
  thunk,
  localStorageMiddleware,
];


// const persistedState = loadFromLocalStorage();

const store: Store<IState, Action> & {
  dispatch: DispatchType
} = createStore(reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);



export default store;

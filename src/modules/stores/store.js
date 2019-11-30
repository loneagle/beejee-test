import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as allReducers from '../reducers';

const reducer = combineReducers({ ...allReducers });

const initialState = {};

let enhancer = applyMiddleware(thunk);

if (process.env.NODE_ENV !== 'production') {
  enhancer = composeWithDevTools({})(applyMiddleware(thunk));
}

export default function store() {
  return createStore(reducer, initialState, enhancer);
}

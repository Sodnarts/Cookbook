import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from 'src/redux/reducers/';

const middlewares = [reduxThunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

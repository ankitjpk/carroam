import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './../reducer';
import {Store, AppState} from './../reducer/types';

const rootReducer = createRootReducer();
const enhancer = applyMiddleware(thunk);

function configureStore(initialState?: AppState): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export {configureStore};

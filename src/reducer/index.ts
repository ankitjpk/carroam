import {combineReducers} from 'redux';
import {AppState} from './types';
import locationReducer from './locationReducer';

export default function createRootReducer() {
  return combineReducers<AppState>({
    locationState: locationReducer,
  });
}

import {Dispatch as ReduxDispatch, Store as ReduxStore} from 'redux';
import {ILocationHistory} from './../types';

export type LocationState = {
  locationHistory: ILocationHistory[];
};

export type AppState = {
  locationState: LocationState;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type Dispatch = ReduxDispatch<ActionType>;

export type Store = ReduxStore<AppState, ActionType>;

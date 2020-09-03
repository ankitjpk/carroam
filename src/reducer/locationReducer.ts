import {LocationState} from './types';
import {AnyAction} from 'redux';
import {
  SET_LOCATION_STATUS,
  SET_DRIVER_STATUS,
} from './../action/locationAction';

const INITIAL_STATE: LocationState = {
  locationHistory: [],
};

const locationReducer = (
  state: LocationState = INITIAL_STATE,
  action: AnyAction,
): LocationState => {
  const {type, payload} = action;

  switch (type) {
    case SET_LOCATION_STATUS:
      return {
        ...state,
        locationHistory: [...state.locationHistory, payload],
      };
    case SET_DRIVER_STATUS:
      return {...state, locationHistory: payload};

    default:
      return state;
  }
};

export default locationReducer;

import {Dispatch} from './../reducer/types';

import {ILocationHistory, ILocationType} from './../types/';

export const SET_LOCATION_STATUS = 'SET_LOCATION_STATUS';
export const SET_DRIVER_STATUS = 'SET_DRIVER_STATUS';

export const setLocationHistoryAction = (
  location: ILocationType | undefined,
) => (disptach: Dispatch) => {
  disptach({type: SET_LOCATION_STATUS, payload: location});
};

export const setDriverStartAction = (status: boolean) => (
  disptach: Dispatch,
) => {
  disptach({type: SET_DRIVER_STATUS, payload: status});
};

import {ILocationType} from '../types';
import MapboxGL from '@react-native-mapbox-gl/maps';

export const calculateDistance = (
  srcLatitude,
  srcLongitude,
  dstLatitude,
  dstLongitude,
) => {
  if (srcLatitude == dstLatitude && srcLongitude == dstLongitude) {
    return 0;
  } else {
    var radlat1 = (Math.PI * srcLatitude) / 180;
    var radlat2 = (Math.PI * dstLatitude) / 180;
    var theta = srcLongitude - dstLongitude;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
};

export const setMapBoxToken = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYW5raXRqcGsiLCJhIjoiY2l4cmJyeWhiMDN2ODMybDk3MHBzcmc2NiJ9.FARgEy_T5jwNqFin60IpHw',
  );
};

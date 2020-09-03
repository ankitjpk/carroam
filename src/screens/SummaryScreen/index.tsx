import SummaryScreen from './SummaryScreen';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppState} from '../../reducer/types';
import {setLocationHistoryAction} from './../../action/locationAction';

export const mapStateToProps = (appState: AppState) => {
  const {locationState} = appState;
  return {locationState};
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setLocationHistory: setLocationHistoryAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);

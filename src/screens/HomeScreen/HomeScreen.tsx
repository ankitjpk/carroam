import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {ComponentTitleText} from '../../utils/styleConstants';
import {BottomController} from './../../components';
import {SolidButton} from './../../components';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import {ILocationType, ILocationHistory, ILocationMetrics} from './../../types';
import {calculateDistance} from './../../utils/distance';
import {TimerComponent} from './../../components';
import {setMapBoxToken} from './../../utils/distance';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {mapStateToProps, mapDispatchToProps} from './index';

interface HeaderProps {
  renderIcon: () => React.ReactNode;
}

interface HomeProps {}

type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type Props = HomeProps & StoreProps;

let accuiredLatLongValue = [];

export const Header: React.FC<HeaderProps> = (props) => {
  const {renderIcon} = props;
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 60,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, marginLeft: 5}}>{renderIcon()}</View>
      <View style={{alignItems: 'center', flex: 6}}>
        <Image
          source={require('./../../assets/Logo.png')}
          style={{width: 40, height: 40}}
        />
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const StatusIndication: React.FC = (props) => {
  const {status} = props;
  return (
    <View
      style={{
        backgroundColor: status ? '#00B726' : 'orange',
        height: 38,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>
        {status ? `GPS SIGNAL ACQUIRED` : 'NO GPS CONNECTION'}
      </Text>
    </View>
  );
};

const HomeScreen: React.FC<Props> = (props) => {
  const [currentLocation, setCurrentLocation] = React.useState<ILocationType>();
  const [startLocationData, setStartLocationData] = React.useState<Boolean>(
    false,
  );
  const [timer, setTimer] = React.useState({
    timerStart: false,
    stopwatchStart: false,
    totalDuration: 90000,
    timerReset: false,
    stopwatchReset: false,
  });
  const [locationMetrics, setLocationMetrics] = React.useState<
    ILocationMetrics
  >();
  const [startTimeState, setStartTimeState] = React.useState('');
  const [distance, setDistance] = React.useState('0.0');

  React.useEffect(() => {
    setMapBoxToken();
    initLocation();
  }, []);

  let timeValue: string = '00:00:00';
  let startTime: string = '';

  const {setLocationHistory} = props;

  const initLocation = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then((status) => {
      if (status == RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async (position) => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },

          (error) => {
            Toast.showWithGravity(
              'Failed collecting your location',
              Toast.LONG,
              Toast.CENTER,
            );
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else if (status == RESULTS.BLOCKED) {
        Toast.showWithGravity(
          'Permission blocked by user',
          Toast.SHORT,
          Toast.CENTER,
        );
      } else {
        Toast.showWithGravity(
          'Permission denied by user',
          Toast.SHORT,
          Toast.CENTER,
        );
      }
    });
  };

  const onFinishLocation = () => {
    setStartLocationData(false);
    setTimer({stopwatchReset: false, stopwatchReset: true});
    const dstValue = distance;
    setDistance('0.0');
    navigation.navigate('Summary', {
      currentPosition: currentLocation,
      startTime: startTimeState,
      duration: timeValue,
      distance: dstValue,
    });
  };

  const startLocation = (status: boolean) => {
    if (status) {
      setStartLocationData(true);
      setTimer({stopwatchStart: true});
    } else {
      setStartLocationData(false);
      setTimer({stopwatchReset: false, stopwatchReset: true});
      setDistance('0.0');
      Geolocation.stopObserving();
    }

    setStartTimeState(new Date().toLocaleString());

    if (status) {
      let watchId: any = null;
      let distance = 0.0;

      watchId = Geolocation.watchPosition(
        (position) => {
          if (position) {
            Toast.showWithGravity('Collecting GPS', Toast.LONG, Toast.CENTER);

            const location: ILocationType = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocationHistory(location);
            distance =
              distance +
              calculateDistance(
                accuiredLatLongValue.length > 0
                  ? accuiredLatLongValue[0]
                  : position.coords.latitude,
                accuiredLatLongValue.length > 0
                  ? accuiredLatLongValue[1]
                  : position.coords.longitude,
                position.coords.latitude,
                position.coords.longitude,
              );
            setDistance(distance.toFixed(2));
            accuiredLatLongValue = [
              position.coords.latitude,
              position.coords.longitude,
            ];
          }
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          interval: 10000,
          distanceFilter: 10,
        },
      );

      // return () => {
      //   if (watchId !== null) {
      //     Geolocation.clearWatch(watchId);
      //   }
      // };
    }
  };

  const setDuration = (time: any) => {
    timeValue = time;
  };

  const {navigation} = props;

  return (
    <SafeAreaView>
      <View>
        <Header
          renderIcon={() => (
            <Text style={{fontSize: 30, marginLeft: 10}}>{`<`}</Text>
          )}
        />
        <StatusIndication status={currentLocation} />
        <View style={styles.container}>
          {currentLocation && (
            <MapboxGL.MapView
              style={{flex: 1}}
              showUserLocation={true}
              zoomEnabled={true}>
              <MapboxGL.Camera
                zoomLevel={11}
                centerCoordinate={[
                  currentLocation.longitude,
                  currentLocation.latitude,
                ]}
              />
              <MapboxGL.UserLocation />
            </MapboxGL.MapView>
          )}
        </View>
        <View style={styles.bottomView}>
          <BottomController
            renderTimer={() => {
              if (startLocationData) {
                return (
                  <View style={styles.timerSection}>
                    <TimerComponent
                      distance={distance}
                      renderTimer={() => (
                        <View
                          style={{
                            marginLeft: 20,
                            alignItems: 'center',
                          }}>
                          <Stopwatch
                            laps
                            start={timer.stopwatchStart}
                            reset={timer.stopwatchReset}
                            totalDuration={timer.totalDuration}
                            options={options}
                            getTime={(time) => setDuration(time)}
                          />
                        </View>
                      )}
                    />
                  </View>
                );
              } else {
                return null;
              }
            }}
            renderFooter={() => (
              <View style={styles.footer}>
                <SolidButton
                  title={
                    !startLocationData
                      ? ComponentTitleText.BUTTON_START
                      : ComponentTitleText.BUTTON_STOP
                  }
                  // disabled={startLocationData}
                  onPress={() => startLocation(!startLocationData)}
                />
                {startLocationData && (
                  <View style={{marginLeft: 20}}>
                    <SolidButton
                      title={ComponentTitleText.BUTTON_FINISH}
                      onPress={onFinishLocation}

                      // disabled={!startLocationData}
                    />
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '85%',
    width: '100%',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  timerSection: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomeScreen;

const options = {
  container: {
    width: 220,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    marginLeft: -25,
  },
};

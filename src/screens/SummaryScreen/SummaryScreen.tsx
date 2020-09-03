import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Header} from './../../screens/HomeScreen/HomeScreen';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {setMapBoxToken} from './../../utils/distance';
import {
  BottomController,
  TimerComponent,
  SolidButtonFlat,
} from './../../components';
import {ComponentTitleText} from '../../utils/styleConstants';
import {mapStateToProps, mapDispatchToProps} from './index';
import moment from 'moment';

interface HeaderProps {
  startTime: string;
}

type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type OwnProp = {
  navigation: any;
  route: any;
};

type Props = OwnProp & StoreProps;
const RideInfo: React.FC<HeaderProps> = (props) => {
  const {startTime} = props;
  if (startTime) {
    const formattedDate = moment(startTime).format('DD/MM/YYYY');
    const formattedTime = moment(startTime).format(' HH:mm');
    const currentTime = moment(new Date()).format('HH:mm');
    return (
      <View style={styles.backDrop}>
        <Text style={styles.headerFont}>Archie's Ride</Text>
        <Text
          style={[
            styles.headerFont,
            {fontSize: 15},
          ]}>{`${formattedDate} @ ${formattedTime} until @${currentTime}`}</Text>
      </View>
    );
  }
};

const SummaryScreen: React.FC<Props> = (props) => {
  const [locationArray, setLocationArray] = React.useState([]);
  const {locationState, navigation} = props;
  const {locationHistory} = locationState;
  React.useEffect(() => {
    setMapBoxToken();

    let locationData;
    if (locationHistory) {
      locationData = locationHistory.map((item) => {
        return [item.latitude, item.longitude];
      });
    }
    setLocationArray(locationData);
  }, [locationHistory]);

  const renderAnnotation = (index) => {
    const route = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [locationArray[index - 1][1], locationArray[index - 1][0]],
              [locationArray[index][1], locationArray[index][0]],
            ],
          },
          style: {
            fill: 'red',
            strokeWidth: '4',
            fillOpacity: 0.6,
          },
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8,
          },
        },
      ],
    };
    const shapeId = 'line' + index;
    const lineId = 'linelayer' + index;
    return (
      <MapboxGL.ShapeSource id={shapeId} shape={route}>
        <MapboxGL.LineLayer
          id={lineId}
          style={{
            lineColor: 'red',
            lineWidth: 3,
            lineCap: 'round',
          }}
        />
      </MapboxGL.ShapeSource>
    );
  };

  const renderAnnotations = () => {
    let lineStyle = [];

    if (locationArray && locationArray.length > 0) {
      for (let i = 1; i < locationArray.length; i++) {
        lineStyle.push(renderAnnotation(i));
      }
      return lineStyle;
    }
  };

  const completeAppRequest = () => {
    navigation.navigate('complete');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const {
    currentPosition,
    startTime,
    endTime,
    duration,
    distance,
  } = props.route.params;

  return (
    <SafeAreaView>
      <View>
        <Header
          renderIcon={() => (
            <Text
              onPress={() => goBack()}
              style={{fontSize: 30, marginLeft: 10, padding: 5}}>{`x`}</Text>
          )}
        />
        <RideInfo startTime={startTime} />
        <View style={styles.container}>
          <MapboxGL.MapView
            style={{flex: 1}}
            showUserLocation={true}
            zoomEnabled={true}>
            {currentPosition && (
              <MapboxGL.Camera
                zoomLevel={14}
                centerCoordinate={[
                  currentPosition.longitude,
                  currentPosition.latitude,
                ]}
              />
            )}
            <MapboxGL.UserLocation />

            {renderAnnotations()}
          </MapboxGL.MapView>
        </View>
        <View style={styles.bottomView}>
          <BottomController
            renderTimer={() => (
              <View style={styles.timerSection}>
                <TimerComponent
                  distance={distance}
                  renderTimer={() => (
                    <View>
                      <Text style={{textAlign: 'center', fontSize: 18}}>
                        {duration && duration}
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
            renderFooter={() => (
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[{backgroundColor: '#006760'}, styles.buttonStyleFlat]}
                  onPress={() => completeAppRequest()}>
                  <Text style={{color: 'white'}}>Save Activity</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: '#006760',
    padding: 15,
  },
  headerFont: {
    fontSize: 20,
    color: 'white',
  },
  container: {
    height: '55%',
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    marginBottom: -20,
  },
  bottomView: {
    backgroundColor: 'white',
  },
  timerSection: {
    borderBottomWidth: 0,
  },
  buttonStyleFlat: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006760',
    elevation: 2,
  },
});

import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface Props {
  renderTimer: () => React.node;
  distance: number;
}

const TimerComponent: React.FC<Props> = (props) => {
  const {renderTimer, distance} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1, marginTop: 5}}>
        <Text style={{textAlign: 'center'}}>Time</Text>
        {renderTimer()}
      </View>

      <View style={{flex: 1, marginTop: 5}}>
        <Text style={{textAlign: 'center'}}>Distance (MI)</Text>
        <Text style={{textAlign: 'center', fontSize: 18}}>{distance}</Text>
      </View>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  font: {
    fontSize: 10,
  },
});

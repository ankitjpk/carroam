import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {Header} from './../../screens/HomeScreen/HomeScreen';

const ActivityPopup: React.FC = (props) => {
  const {navigation} = props;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Header
        renderIcon={() => (
          <Text
            onPress={() => goBack()}
            style={{fontSize: 30, marginLeft: 10, padding: 5}}>{`x`}</Text>
        )}
      />
      <View style={{alignItems: 'center', marginTop: 40, margin: 10}}>
        <Image
          source={require('./../../assets/CircleTick.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={{fontSize: 28, marginTop: 15}}>Activity Saved</Text>
        <Text style={{fontSize: 20, marginTop: 10}}>
          Your activity had been saved and can be viewed in the activity tab.
        </Text>
      </View>
    </View>
  );
};

export default ActivityPopup;

import * as React from 'react';
import {Text, View, Button} from 'react-native';

interface Props {
  renderTimer: () => React.ReactNode;
  renderFooter: () => React.ReactNode;
}

const BottomController: React.FC<Props> = (props) => {
  const {renderTimer, renderFooter} = props;
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 5,
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
      }}>
      {renderTimer()}

      <View
        style={{
          height: 60,
          borderBottomWidth: 1,
          borderColor: '#DCDCDC',
        }}></View>

      {renderFooter()}
    </View>
  );
};

export default BottomController;

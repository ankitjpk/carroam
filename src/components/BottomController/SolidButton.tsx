import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';

interface Props {
  title: string;
  backgroundColor: string;
  buttonTextColor: string;
  onPress: () => void;
}

const SolidButtonFlat: React.FC<Props> = (props) => {
  const {title, backgroundColor, buttonTextColor, onPress} = props;
  return (
    <TouchableOpacity
      style={[{backgroundColor: backgroundColor}, styles.buttonStyleFlat]}
      onPress={onPress}>
      <Text style={{color: buttonTextColor || 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const SolidButton: React.FC<Props> = (props) => {
  const {title, backgroundColor, buttonTextColor, onPress, disabled} = props;
  return (
    <TouchableOpacity
      style={[styles.buttonStyle]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: buttonTextColor || 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 70,
    width: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    elevation: 2,
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

export {SolidButton, SolidButtonFlat};

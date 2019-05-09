import React from 'react';
import {
  Text, StyleSheet,
  TouchableOpacity, 
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  indicator: {
    height: 80,
    position: 'absolute'
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20
  },
  loginButton: {
    backgroundColor: '#1c262f',
    marginTop: 20,
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center'
  },
});

const ButtonIndicator = ({ size, style, color, text, disabled, ...rest }) => (
   <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[styles.loginButton, style.loginButton]}
    >
    {
      disabled 
      && <ActivityIndicator 
        size="large"
        color="#00ff00"
        style={[styles.indicator, style.indicator]} 
      />
    }
    <Text style={[styles.loginButtonText, style.loginButtonText]}>{text}</Text>
  </TouchableOpacity>
);

export default ButtonIndicator;


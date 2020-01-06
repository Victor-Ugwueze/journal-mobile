import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseInput: {
    paddingVertical: 6,
    color: "gray"
  },
});

const BaseInput = ({ children, label, showLabel }) => (
  <View style={[styles.baseInput]}>
   {showLabel && <Text>{label}</Text> }
    {children}
  </View>
);

export default BaseInput;


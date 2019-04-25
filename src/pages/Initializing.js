import React, { Component } from 'react';
import {
  Text, View, StyleSheet, AsyncStorage,
} from 'react-native';
import { redirectToAuth, redirectHome } from '../navigation';


export default class Initializing extends Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem('token');
      if (user) {
        redirectHome();
      } else {
        redirectToAuth();
      }
    } catch (err) {
      redirectToAuth();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

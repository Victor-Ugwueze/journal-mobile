import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import { redirectToAuth, redirectHome } from '../navigation';


export default class Initializing extends Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token')
      if (token) {
        redirectHome();
      } 
    } catch (err) { }
  }

  redirectToLogin () {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 4
			}, 
		});
    redirectToAuth();
  }

  redirectToSignUp () {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 2
			}, 
		})
  }

  render() {
    return (
     
      <View style={styles.container}>
       <Image source={require('../img/background.jpg')} style={styles.backgroundImage} resizeMode="stretch" />
        <View style={styles.mainSection}>
          <View style={styles.heroText}>
            <Text style={styles.heroTextTitle}>We care about your mood</Text>
            <Text style={styles.heroTextBody}>
                  Diary allows you to pen down customize your stories that match your mood
            </Text>
       </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={[styles.Buttons, styles.loginButton]}
            onPress={() => this.redirectToLogin()}
          > 
            <Text style={styles.ButtonText}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.Buttons, styles.createAccountButton]}
            onPress={() => this.redirectToSignUp()}
          > 
            <Text style={styles.createAccountText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  backgroundImage: {
    height: '25%',
    width: '70%',
    borderRadius: 10,
    marginTop: 90,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: 16,
    backgroundColor: '#F2F1EF'
  },
  mainSection: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center'
  },
  heroText: {
    padding: 18
  },
  heroTextTitle: {
    textAlign: 'center',
  },
  heroTextBody: {
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '80%'
  },
  Buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
  },
  loginButton: {
    backgroundColor: '#1c262f',
    marginBottom: 16,
  },
  createAccountButton: {
    backgroundColor: '#F2F1EF',
    borderColor: '#000'
  },
  ButtonText: {
    fontSize: 18,
    color: '#FFF',

  },
  createAccountText: {
    color: '#6C7A89',
  }
});

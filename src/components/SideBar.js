import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../img/logo.png';
import { redirectToAuth } from '../navigation'

export default class SideBar extends Component {
  handleLogout = () => {
    AsyncStorage.removeItem('token');
    redirectToAuth();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuHeader}>
          <Image source={Logo} style={{width: 40, height: 40}}/>
        </View>
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="plus" color="white" size={18}></Icon>
            <Text style={styles.menuItemText}>New Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="book" color="white" size={18}></Icon>
            <Text style={styles.menuItemText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="cog" color="white" size={18}></Icon>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="user" color="white"size={18} ></Icon>
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuFooter} onPress={this.handleLogout}>
          <Icon name="sign-out" color="white"size={18} ></Icon>
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c262f',
  },
  menuHeader: {
    height: 50,
    borderBottomColor: '#FFF',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 0.5
  },
  menuList: {
    padding: 16,
    paddingLeft: 20,
    flexDirection: 'column',
  },
  menuItem: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 18,
    paddingLeft: 30
  },
  menuFooter: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 16,
    padding: 16,
  },
  logOutText: {
    paddingLeft: 16,
    color: "#FFF"
  }
});
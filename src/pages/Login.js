import gql from 'graphql-tag';
import {  graphql  } from 'react-apollo';
import React, { Component } from 'react';
import { Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Image,
  Keyboard,
  Alert,
  AsyncStorage,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import backgroundImage from '../img/background.jpg';
import Logo from '../img/logo.png';
import { loginMutation } from '../schemas';
import { redirectHome } from '../navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


 class Login extends Component {

  state = {
    email: '',
    password: '',
    inputErrors: []
  }

  handleInputChange = (value, target) => {
    this.setState({
      [target]: value
    });
  }

  validateInput() {
    const { email, password } = this.state;
    if(email === '' || password === '') {
      const error = { 
        message: 'email and password field is required'
      };
      this.setState({
        inputErrors: this.state.errors.push(error)
      })
    }
  }

  showErrorAlert() {
    Alert.alert('Error', errors[0].message, 
    [
      {
        text: 'Ok',
        onPress: () => console.log('Ask me later pressed')
      }
    ]
  )
  }

  handleErrors(errors) {
    const { GraphqlErrors } = errors;
  }

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { loginMutation } = this.props;
    const { email, password, inputErrors } = this.state;

    this.validateInput();
    if(inputErrors.length) {
      this.showErrorAlert();
      this.setState({ inputErrors: [] });
      return;
    }
    const { 
      data: { login: { token, id } }, errors } = await loginMutation({
        variables: {
          email,
          password
        }
      });
      // this.handleErrors(errors);
      console.log(errors);

    AsyncStorage.setItem('token', token);
    redirectHome();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="stretch">
    <View style={styles.container}>
      <View style={styles.logo}>
          <Image source={Logo} style={{width: 40, height: 40}}/>
      </View>
          <View style={styles.form}>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="envelope-square" size={20} color="#FFF"/>
              <TextInput 
                onChangeText={input => this.handleInputChange(input, 'email')}
                placeholder="Email"
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor="#FFF"
              />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="lock" size={20} color="#FFF"/>
              <TextInput 
                onChangeText={input => this.handleInputChange(input, 'password')}
                placeholder="Password" 
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor="#FFF"
              />
            </View>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default graphql(loginMutation, { name: 'loginMutation'})(Login);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
    backgroundColor: 'rgba(32,36,100,0.6)',
    justifyContent: 'center',
    height: '100%'
  },
  logo: {
    position: 'absolute',
    top: 10,
    
  },
  searchSection: {

  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 25
  },
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    marginTop: 10,
    marginLeft: 40,
    fontSize: 18,
    borderRadius: 4,
    color: '#FFF',
    borderColor: '#1c262f', //7a42f4
  },
  loginButton: {
    backgroundColor: '#1c262f',
    marginTop: 10,
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20
  },
  placeHolderText: {
    color: '#FFF'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-around',
    width: null,
    height: null,    
  }
});

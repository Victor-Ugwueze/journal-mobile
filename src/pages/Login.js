import {  graphql  } from 'react-apollo';
import React, { Component } from 'react';
import { Text, 
  View, 
  StyleSheet, 
  Keyboard,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { loginMutation } from '../schemas';
import { redirectHome } from '../navigation';
import AppInput from '../components/inputs/AppInput';
import ButtonIndicator from '../components/buttons/ButtonIndicator';
import Logo from '../img/logo.png'

 class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: [],
    isSubmitting: false,
    authFailure: false
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

  handleErrors(errors) {
    const { GraphqlErrors } = errors;
  }

  handleDisableButton(isSubmitting) {
    this.setState({
      isSubmitting
    })
  }

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { loginMutation } = this.props;
    const { email, password } = this.state;
    
    this.handleDisableButton(true);
    this.setState({ authFailure: false })
    try {
      const { 
        data: { login: { token, errors  } } } = await loginMutation({
          variables: {
            email,
            password
          }
        });
        AsyncStorage.setItem('token', token);
        redirectHome();
    } catch (error) {
      this.setState({ authFailure: true })
    }
    this.handleDisableButton(false);

  }

  render() {
    const { errors, isSubmitting, authFailure, email, password } = this.state;
    return (
    <View style={styles.container}>
          <Text style={styles.welcomeText}>Login and enjoy your stuff </Text>
          <Image source={Logo} style={styles.logo}/>
          <View style={styles.form}>
            {
              authFailure 
              && <Text style={styles.loginTextError}>Incorrect Email/Password</Text>
            }
            <View style={styles.searchSection}>
              <AppInput 
                onChangeText={input => this.handleInputChange(input, 'email')}
                placeholder="Email"
                errors={errors}
                label="Email"
                showLabel={email !== ''}
              />
            </View>
            <View style={styles.searchSection}>
              <AppInput 
                onChangeText={input => this.handleInputChange(input, 'password')}
                placeholder="Password" 
                errors={errors}
                showLabel={password !== ''}
                label="Password"
              />
            </View>
            <ButtonIndicator 
              disabled={isSubmitting}
              text="Login"
              style={{}}
              onPress={() => this.handleSubmit()}
            />
          </View>
        </View>
    );
  }
}

export default graphql(loginMutation, { name: 'loginMutation'})(Login);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
  welcomeText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
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
    fontSize: 18,
    borderRadius: 4,
    color: '#FFF',
    borderColor: '#1c262f', 
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
  },
  loginTextError: {
    color: 'red',
    textAlign: 'center',
  }
});

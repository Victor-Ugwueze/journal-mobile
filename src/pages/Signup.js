import { Query, graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Text, View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  Keyboard,
  AsyncStorage
} from 'react-native';

import { signUpMutation } from '../schemas';
import { redirectHome } from '../navigation';


class SignUp extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    inputErrors: []
  }

  handleInputChange = (value, target) => {
    this.setState({
      [target]: value
    });
  }

  validateInput() {
    const { email, password } = this.state;
    console.log('hdhhddh', password);

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
    const { GraphqlErros } = errors;
    console.log(GraphqlErros);
  }

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { signUpMutation } = this.props;
    const { 
      email, 
      password, 
      inputErrors,
      firstName,
      lastName,
    } = this.state;

    this.validateInput();
    if(inputErrors.length) {
      this.showErrorAlert();
      this.setState({ inputErrors: [] });
      return;
    }
    const { 
      data: { create: { token } } } = await signUpMutation({
        variables: {
          input: { 
            email,
            password,
            lastName,
            firstName
          }
        }
      });
      AsyncStorage.setItem('token', token);
      redirectHome();
  }

  render() {
    return (
      <ImageBackground source={require('../img/background.jpg')} style={styles.backgroundImage} resizeMode="stretch">
      <View style={styles.container}>
        <View>
          <TextInput 
            placeholder="Email" 
            style={styles.textInput}
            onChangeText={value => this.handleInputChange(value, 'email')}
          />
          <TextInput 
            placeholder="First name" 
            style={styles.textInput}
            onChangeText={value => this.handleInputChange(value, 'firstName')}
          />
          <TextInput 
            placeholder="Last name" 
            style={styles.textInput}
            onChangeText={value => this.handleInputChange(value, 'lastName')}
          />
          <TextInput 
            placeholder="Password" 
            style={styles.textInput}
            onChangeText={value => this.handleInputChange(value, 'password')}
          />
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.loginButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(32,36,100,0.6)',
    justifyContent: 'center',
    height: '100%'
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    borderRadius: 4,
    borderColor: '#FFFF',
  },
  loginButton: {
    backgroundColor: '#1c262f',
    margin: 10,
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFF',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-around',
    width: null,
    height: null,    
  }
});

export default graphql(signUpMutation, { name: 'signUpMutation'})(SignUp);

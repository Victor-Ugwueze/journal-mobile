import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Keyboard,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { signUpMutation } from '../schemas';
import { redirectHome } from '../navigation';
import AppInput from '../components/inputs/AppInput';
import ButtonIndicator from '../components/buttons/ButtonIndicator';
import Logo from '../img/logo.png'

class SignUp extends Component {

  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    errors: [],
    isSubmitting: false,
  }

  clearErrorOnInputChanged = target => {
    const { errors } = this.state;
    if (errors.length) {
      errors.forEach((error, i) => {
        if(error.field === target) {
          errors.splice(i, 1);
        }
      });
    }
  }

  handleInputChange = (value, target) => {
    this.setState(prevState => ({
        user:{
          ...prevState.user,
          [target]: value
        },
    }));
    this.clearErrorOnInputChanged(target);
  }

  handleErrors(error) {
    const { graphQLErrors } = error;
    console.log(graphQLErrors, 'GraphqlErrors', error);
  }

  handleDisableButton(isSubmitting) {
    this.setState({
      isSubmitting
    })
  }

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { signUpMutation } = this.props;
    const { user } = this.state;
    this.handleDisableButton(true);
    this.setState({ errors: [] });
      const { data: { create: { errors, token } } } = await signUpMutation({
        variables: {
          input: { ...user }
        }
      });
  
      this.handleDisableButton(false);
      if(!errors) {
        AsyncStorage.setItem('token', token);
        redirectHome();
        return;
      }
      this.setState({
        errors
      });
  }

  render() {
    const { user: { email, firstName, lastName, password }, errors, isSubmitting } = this.state;

    return (
      <View style={styles.container}>
        {/* <Text>Welcome signup and start creating awesome stuffs</Text> */}
        <Image source={Logo} style={styles.logo}/>
        <View style={styles.form}>
          <AppInput 
            onChangeText={input => this.handleInputChange(input, 'email')}
            placeholder="Email"
            label="Email"
            errors={errors}
            showLabel={email !== ''}
          />
          <AppInput 
            placeholder="First name"
            label="First name" 
            showLabel={firstName !== ''}
            errors={errors}
            onChangeText={value => this.handleInputChange(value, 'firstName')}
          />
          <AppInput 
            placeholder="Last name" 
            label="Last name"
            errors={errors}
            showLabel={lastName !== ''}
            onChangeText={value => this.handleInputChange(value, 'lastName')}
          />
          <AppInput 
            placeholder="Password"
            label="Password"
            errors={errors}
            showLabel={password !== ''}
            onChangeText={value => this.handleInputChange(value, 'password')}
          />
          <ButtonIndicator 
            disabled={isSubmitting}
            text="Create Account"
            style={{
              loginButtonText: styles.loginButtonText, 
              loginButton: styles.loginButton 
            }}
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: 50,
    height: '40%'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    borderRadius: 4,
    color: '#FFF',
    borderColor: '#1c262f', //7a42f4
  },
  loginButton: {
    marginTop: 10,
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

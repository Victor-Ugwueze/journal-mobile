import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import {  graphql  } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createEntryMutation } from '../schemas';
import AppInput from '../components/inputs/AppInput';
import { redirectHome } from '../navigation';
import { Navigation } from 'react-native-navigation';  

class CreateDiary extends Component {
  state = {
    title: '',
    body: '',
    errors: [],
    height: 0,
    isSubmitting: false,
  }

  static options({ title }) {
    return {
      topBar: {
        title: {
          text: title
        },
        animate: false
      }
    };
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

  handleTextChange = (value, target) => {
    this.setState({
      [target]: value
    });
    this.clearErrorOnInputChanged(target);
  }

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { createEntryMutation } = this.props;
    this.setState({
      isSubmitting: true
    })
    const { title, body } = this.state;
    try {
      const { data: { createEntry: { entry, errors } } } = await createEntryMutation({ 
        variables: { 
          input: { 
            title, 
            body 
          } 
        } 
      });
      if(errors.length){
        this.setState({ errors })
        return;
      }
      Navigation.push(this.props.componentId, {
        component: {
          name: 'HomeScreen',
          passProps: {
            entry,
            message: 'Entry Successfully created',
            entryCreated: true,
          }
        },
        
      });
    } catch (error) {

    }
    this.setState({
      isSubmitting: false
    });
  }


  render() {
    const { errors, isSubmitting} = this.state;
    return (
      <View style={styles.container}>
          <View style={styles.diaryBody}>
          {
            isSubmitting
            && (
              <ActivityIndicator
              size="large"
              color="#00ff00"
                style={styles.indicator}
              />
            )
          }

          <AppInput 
            style={styles.titleInput}
            selectionColor={'gray'}
            label="title"
            errors={errors}
            showLabel={false}
            placeholder="Title..."
            onChangeText={value => this.handleTextChange(value, 'title')}
          />
          <AppInput 
            multiline={true}
            errors={errors}
            onContentSizeChange={(event) => 
              this.setState({ height: event.nativeEvent.contentSize.height})
          }
            style={[styles.bodyInput, {
              height: Math.min(200, Math.max(35, this.state.height))
            }]}  
            showLabel={false}
            selectionColor={'gray'}
            label="body"
            placeholder="description..."
            onChangeText={value => this.handleTextChange(value, 'body')}
          />
          </View>
          {
            !isSubmitting 
            && (
              <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.TouchableOpacityStyle}
                onPress={() => this.handleSubmit()}
               >
                <Icon name="check-circle"
                  style={styles.FloatingButtonStyle} 
                  size={50} color="green"
                />
              </TouchableOpacity>
            )
          }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  indicator: {
    height: 80,
    top: '20%',
    left: '45%',
    position: 'absolute'
  },
  diaryBody: {
    flex: 1,
    width: '100%'
  },
  titleInput: {
    height: 40, 
    borderBottomWidth: 0,
    fontSize: 18,
  },
  bodyInput: {
    marginTop: 20,
    borderBottomWidth: 0
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    bottom: 30,
  },
});

export default graphql(createEntryMutation, { name: 'createEntryMutation'})(CreateDiary);

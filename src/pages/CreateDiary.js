import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import {  graphql, compose  } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createEntryMutation, updateEntryMutation } from '../schemas';
import AppInput from '../components/inputs/AppInput';
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

  componentDidMount() {
    const { entry, mode } = this.props;
    if(mode === 'edit') {
      this.setState({
        title: entry.title,
        body: entry.body,
        id: entry.id,
        mode: 'edit'
      });
    }
  }

  handleTextChange = (input) => {
    this.setState({
      [input.target]: input.value
    });
    this.clearErrorOnInputChanged(input.target);
  }

  redirectToHome(entry, errors) {
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
        },
      },
    });
  }

  async create () {
    const { title, body, mode, id } = this.state;
    const { createEntryMutation, updateEntryMutation } = this.props;

    let mutationAction = input => createEntryMutation(input);
    let mutation = 'createEntry';
    if(mode === 'edit') {
      mutationAction = input => updateEntryMutation(input);
      mutation = 'updateEntry'
    }

    const { data: { [mutation]: { entry, errors } } } = await mutationAction({ 
      variables: { 
        input: { 
          title,
          body,
          id,
          mode,
        }
      }
    });
    return {
      entry,
      errors,
    };
  }


  handleSubmit = async () => {
    Keyboard.dismiss();
    this.setState({
      isSubmitting: true
    });
    try {
     const { errors, entry } = await this.create();
     this.redirectToHome(entry, errors);
    } catch (error) {
      console.log(error);
    }
    this.setState({
      isSubmitting: false
    });
  }


  render() {
    const { errors, isSubmitting, title, body } = this.state;

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
            value={title}
            showLabel={false}
            placeholder="Title..."
            onChangeText={value => this.handleTextChange({ target: 'title' , value })}
          />
          <AppInput 
            multiline={true}
            errors={errors}
            value={body}
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
            onChangeText={value => this.handleTextChange({ value, target: 'body' })}
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

export default compose(
  graphql(createEntryMutation, { name: 'createEntryMutation' }),
  graphql(updateEntryMutation, { name: 'updateEntryMutation' })
)(CreateDiary);

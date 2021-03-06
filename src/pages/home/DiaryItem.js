import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DiaryItem extends Component {
  handleEdit = () => {
    const { item } = this.props;
    Navigation.push('App', {
      component: {
        name: 'CreateDiaryScreen',
        passProps: {
          mode: 'edit',
          title: 'Edit Entry',
          entry: {
            ...item
          }
        }
      }
    });
  }

  handleDelete = async () => {
    const { item: { id }, deleteEntryMutation, refetch } = this.props;
    try {
      const { data: { deleteEntry: { message } } } = await deleteEntryMutation({
        variables: {
          id
        }
      });
      refetch();
    } catch (error) {}
  }

  render() {
    const { item: { title, body } } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.container}>
            <View style={styles.header}>
              <Text> 29 MAY 2019</Text>      
            </View>
            <View style={styles.content}>
              <Text style={styles.contentTitle}> {title} </Text>
              <Text>{body}...</Text>  
            </View>
            <View style={styles.actionButtonIcons}>
              <TouchableOpacity 
                style={styles.icon}
                onPress={() => this.handleEdit()}
              >
                <Icon name="edit" color="#000" size={18}></Icon>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity style={styles.icon} onPress={this.handleDelete}> 
                <Icon name="trash" color="#000" size={18}></Icon>
              </TouchableOpacity>
            </View>
        </TouchableOpacity>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: 0.5,
    height: 150,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 8
  },
  header: {
    alignItems: 'center',
    paddingTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 16,
  },
  contentTitle: {
    color: '#000'
  },
  actionButtonIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 16,
    flexDirection: 'row'
  },
  icon: {
    paddingLeft: 8,
    paddingRight: 8
  }
})

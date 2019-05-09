import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Platform } from 'react-native';
import DiaryItem from './DiaryItem';


const data = [
  {
    id: "1",
    title: 'The title of this',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "2",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "3",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "4",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "5",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "6",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "7",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  {
    id: "8",
    title: 'The first',
    body: 'This is the story of a girl that has the man'
  },
  
]

export default class ListDiary extends Component {
  renderSeparator (highlighted) {
    return (
      <View style={styles.separator} /> 
    );
  }
  
  render() {
    const { handleEdit } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item})  => <DiaryItem item={item} handleEdit={handleEdit}/>}
          keyExtractor={( item ) => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    borderColor: '#d6d7da',
  },
  separator: {
      height: 1,
      backgroundColor: "#CED0CE",
  }
})

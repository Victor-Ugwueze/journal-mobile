import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {  graphql, compose  } from 'react-apollo';

import DiaryItem from './DiaryItem';
import { listAllEntries, deleteEntryMutation } from '../../schemas';


class ListDiary extends Component {
  renderSeparator (highlighted) {
    return (
      <View style={styles.separator} /> 
    );
  }

  renderEmptyComponent () {
    return (
      <View style={styles.noDataView}>
        <Text>You have no entries</Text>
      </View>
    )
  }
  
  render() {
    const { 
      entries: { 
        loading, 
        listAllEntries, 
        refetch
      }, 
      entryCreated, 
      deleteEntryMutation,
      deleteEntry
    } = this.props;

    if(entryCreated) {
      refetch();
    }
  
    if (loading) {
      return (
        <ActivityIndicator 
          size="large"
          color="#00ff00"
      />
      )
    } 
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={listAllEntries}
          ListEmptyComponent={this.renderEmptyComponent}
          renderItem={({item})  => (
            <DiaryItem 
              item={item} 
              refetch={refetch} 
              deleteEntryMutation={deleteEntryMutation}
            />
          )}
          keyExtractor={( item ) => item.id}
        />
      </View>
    )
  }
}

export default compose(
  graphql(listAllEntries, { name: 'entries'}),
  graphql(deleteEntryMutation, { name: 'deleteEntryMutation'}),
)(ListDiary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    borderColor: '#d6d7da',
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
      height: 1,
      backgroundColor: "#CED0CE",
  }
})

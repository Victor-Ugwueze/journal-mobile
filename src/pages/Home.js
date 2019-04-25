import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';  
import Icon from 'react-native-vector-icons/FontAwesome';
import ListDiary from '../components/ListDiary';



export default class Home extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);

	Icon.getImageSource('bars', 32, 'black').then(src =>
		Navigation.mergeOptions(this.props.componentId, {
			topBar: {
				leftButtons: [
					{
						id: 'toggleMenu',
						icon: src,
					},
        ],
        searchBar: true,
			}, 
		})
	);
  }

  navigationButtonPressed({ buttonId }) {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible : buttonId === 'toggleMenu'
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
       <ListDiary />
        <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.TouchableOpacityStyle}
          onPress={() => Navigation.push(this.props.componentId, {
            component: {
              name: 'CreateDiaryScreen',
            }
          })}
        >
            <Icon name="plus-circle"  style={styles.FloatingButtonStyle} size={40} color="#f06595"/>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
})
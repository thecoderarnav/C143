import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/Home';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

export default function App() {
  return <AppContainer/>
}
const apptopnavigation = createMaterialTopTabNavigator({

})
const AppStackNavigator = createStackNavigator({
  Home:{
    screen : HomeScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  apptopnav:{
    screen:apptopnavigation,
    navigationOptions:{
      headerBackTitle:null,
      headerTintColor:'orange',
      headerTitle:'Reccommended Movies',
      headerStyle:{
        backgroundColor:"white"
      },
      headerTitleStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize: RFValue(18)
      }
  
    }
  }
},
{
  initialRouteName:'Home'
}
);
const AppContainer = createAppContainer(AppStackNavigator)
    

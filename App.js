
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator';
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import DashBoardScreen from './screens/DashBoardScreen'
import { createSwitchNavigator,createAppContainer} from 'react-navigation';
import { firebaseConfig } from './config';
import * as firebase from 'firebase' 


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}
const SwitchNavigator=createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashBoardScreen:DashBoardScreen
})
const AppContainer=createAppContainer(SwitchNavigator)
export default function App() {
  return (
   <AppContainer/>
  );
}

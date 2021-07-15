import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class LogOutScreen extends React.Component {
    componentDidMount(){
        firebase.auth().signOut()
    }
    render(){
  return (
    <View style={{flex:1}}>
      <Text>LOG OUT</Text>
     
    </View>
  );
  } 
}
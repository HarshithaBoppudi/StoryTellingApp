    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import DashBoardScreen from './DashBoardScreen';
    import * as firebase from 'firebase'

    export default class LoadingScreen extends React.Component{
        checkIfLogedIn=()=>{
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
                    this.props.navigation.navigate('DashBoardScreen')
                }
                else{
                    this.props.navigation.navigate('LoginScreen')
                }
            })
        }
    componentDidMount(){
        this.checkIfLogedIn()
    } 
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>
                    LOADING...
                </Text>
            </View>
        )
    }  
    }
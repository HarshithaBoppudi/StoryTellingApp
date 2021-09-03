import React, { Component } from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import firebase from 'firebase'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
 
export default class CustomSideBarMenu extends Component{
    constructor(props){
      super(props)
      this.state={
          lightTheme:true
      }


    }
    fetchUser=()=>{
        let theme
        firebase.database().ref('/users/'+firebase.auth().currentUser.uid).on('value',snapshot=>{
          theme=snapshot.val().current_theme
          this.setState({
            lightTheme:theme==='light'?true:false
          })
        })
      }
 componentDidMount(){
     this.fetchUser()
 } 
 render(){
     let props=this.props
     return(
        <View style={this.state.lightTheme?styles.containerLight:styles.container}>
             <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
             <DrawerContentScrollView {...props}>
                 <DrawerItemList {...props}/>
             </DrawerContentScrollView>
        </View>
     )
 }    
}
const styles=StyleSheet.create({
    containerLight:{
        flex:1,
        backgroundColor:'white'
      },
      container:{
        flex:1,
        backgroundColor:'#2072d6'
      },
})

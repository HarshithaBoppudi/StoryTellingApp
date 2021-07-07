import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import  firebase from 'firebase'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

let costumFonts={'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let stories=require('./Temp_stories.json')

export default class Profile extends React.Component {
  constructor(){
    super()
    this.state={
      fontsLoded:false,
      lightTheme:true,
      profileImage:'',
      isEnabled:false,
      name:''
    }
  }
  toggleSwitch(){
    const previousState=this.state.isEnabled
    const theme=!this.state.isEnabled?'dark':'light'
    var updates={
      
    }
    updates[
      '/users/'+firebase.auth().currentUser.uid+'/current_theme'
    ]=theme
    firebase.database().ref().update(updates)
    this.setState({
      isEnabled:!previousState,
      lightTheme:previousState
    })
  }
  async loadFonts(){
    await Font.loadAsync(costumFonts)
    this.setState({
      fontsLoded:true
    })
  }
  componentDidMount(){
    this.loadFonts()
  }
  async fetchUser(){
    let theme,name,image
    await firebase.database().ref('/users/'+firebase.auth().currentUser.uid).on(
      'value',function(snapshot){
        theme=snapshot.val().current_theme
        name:snapshot.val().first_name+last_name
        image:snapshot.val().profile_picture
      }
    )
    this.setState({
      lightTheme:theme==='light'?true:false,
      isEnabled:theme==='light'?false:true,
      name:name,
      profileImage:image
    })
  }
  render(){
    
      if(!this.state.fontsLoded){
        return( 
          <AppLoading/>
        )
      }
    else{
      return(
        <View style={{flex:1,backgroundColor:'#2072d6'}}>
          <SafeAreaView style={styles.droidView}/>
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
               
            </View>

            <View style={styles.appTitleContainer}>
              <Text style={{color:'white',fontSize:RFValue(28),fontFamily:'Bubblegum-Sans'}}>
                Story Telling App</Text>

            </View>

          </View>
          </View>
        )  
    }
  }
}

import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, TouchableOpacity,Switch} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'

import  firebase from 'firebase'


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
        name=snapshot.val().first_name+last_name
        image=snapshot.val().profile_picture
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
        <View style={this.state.lightTheme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidView}/>
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
               
            </View>

            <View style={styles.appTitleContainer}>
              <Text style={this.state.lightTheme?styles.appTitleTextLight:styles.appTitleText}>
                Story Telling App</Text>

            </View>

          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={{uri:this.state.profileImage}}/>
              <Text style={this.state.lightTheme?styles.nameTextLight:styles.nameText}>
                   {this.state.name}
              </Text>
            </View>
            <View style={styles.themeContainer}>
            <Text style={this.state.lightTheme?styles.themeTextLight:styles.themeText}>
              Dark Theme
            </Text>
            <Switch
            style={{transform:[{scaleX:1.3},{scaleY:1.3}]}}
            trackColor={{false:'gray',true:this.state.lightTheme?'#eee':'white'}}
            thumbColor={this.state.isEnabled?'orange':'aqua'}
            ios_backgroundColor={'violet'}
            onValueChange={()=>{this.toggleSwitch()}}
            value={this.state.isEnabled}
            />
            </View>

          </View>
          </View>
        )  
    }
  }
}

const styles=StyleSheet.create({
  droidView:{
    marginTop:Platform.OS==='android'?StatusBar.currentHeight:RFValue(35)
  },
  appTitle:{
    flex:0.05,
    flexDirection:"row",


  },
  appIcon:{
    flex:0.3,
    justifyContent:"center",
    alignItems:"center"
  },
  appTitleText:{
    color:'white',
    textAlign:'center',
    fontSize:RFValue(40),
    fontFamily:'Bubblegum-Sans'
  },
  appTitleContainer:{
    flex:0.7,
    justifyContent:'center'
  },
  screenContainer:{
    flex:0.85,

  },
  profileImageContainer:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
  },
  profileImage:{
    width:RFValue(140),
    height:RFValue(140),
    borderRadius:RFValue(70)
  },
  nameText:{
    color:'white',
    fontSize:RFValue(40),
    fontFamily:'Bubblegum-Sans',
    marginTop:RFValue(10)
  },
  themeContainer:{
    flex:0.2,
    flexDirection:'row',
    justifyContent:'center',
    marginTop:RFValue(20)
  },
  themeText:{
    color:'white',
    fontSize:RFValue(30),
    fontFamily:'Bubblegum-Sans',
    marginRight:RFValue(15)
  },
  containerLight:{
    flex:1,
    backgroundColor:'white'
  },
  container:{
    flex:1,
    backgroundColor:'#2072d6'
  },
  appTitleTextLight:{
    color:'black',
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(28)
  },
  appTitle:{
    color:'white',
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(28)
  },
  nameTextLight:{
    color:'black',
    fontSize:RFValue(40),
    fontFamily:'Bubblegum-Sans',
    marginTop:RFValue(10)
  },
  themeTextLight:{
    color:'black',
    fontSize:RFValue(30),
    fontFamily:'Bubblegum-Sans',
    marginRight:RFValue(15)
  }

})

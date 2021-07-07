import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import  firebase from 'firebase'
import * as Google from 'expo-google-app-auth'



let costumFonts={'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let stories=require('./Temp_stories.json')

export default class Feed extends React.Component {
  constructor(){
    super()
    this.state={
      fontsLoded:false
    }
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

  isUserEqual=(googleUser, firebaseUser)=>{
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  signInWithGoogleAsync =async()=> {
    try {
      const result = await Google.logInAsync({
        behavior:'web',
        androidClientId: '728627569095-p2fggp6b3489l37jg9hna9h9ird0ladu.apps.googleusercontent.com',
      iosClientId: '728627569095-hur8fdq911sq42funa4tnu56geqcicph.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  onSignIn=(googleUser)=>{

    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idtoken,googleUser.accessToken);
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          if(result.additionalUserInfo.isNewUser){
            firebase.database().ref('/users/'+result.user.uid).set({
              gmail:result.user.email,
              profile_picture:result.additionalUserInfo.profile.picture,
              locale:result.additionalUserInfo.profile.locale,
              first_name:result.additionalUserInfo.profile.given_name,
              last_name:result.additionalUserInfo.profile.family_name,
              current_theme:'dark'
            }).then(function(snapshot){})
          }
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
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

          <Text style={styles.appTitleText}>
            {'STORY TELLING\n APP'}
          </Text>
        
         </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} 
               onPress={()=>{
                 this.signInWithGoogleAsync()
               }}
              >
                <Image style={styles.googleIcon} source={require('../assets/google_icon.png')}/>
                <Text style={styles.googleText}> sign in with google</Text>
                      
              </TouchableOpacity>
          </View>
          <View style={styles.cloudContainer}>
            <Image style={styles.cloudImage} source={require('../assets/cloud.png')}/>
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
  buttonContainer:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:RFValue(250),
    height:RFValue(50),
    flexDirection:'row',
    justifyContent:'space-evenly',
    borderRadius:RFValue(30),
    backgroundColor:'white'
  },
  googleIcon:{
    width:RFValue(30),
    height:RFValue(30),
    resizeMode:'contain'
  },
  googleText:{
    color:'black',
    fontSize:RFValue(20),
    fontFamily:'Bubblegum-San'
    
  },
  cloudContainer:{
    flex:0.3,
  },
  cloudImage:{
    position:'absolute',
    width:'100%',
    resizeMode:"contain"
  }
})




   



  
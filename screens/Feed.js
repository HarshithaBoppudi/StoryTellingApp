
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import firebase from 'firebase'



let costumFonts={'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let stories=require('./Temp_stories.json')

export default class Feed extends React.Component {
  constructor(){
    super()
    this.state={
      fontsLoded:false,
      lightTheme:true,
      stories:[]
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
  fetchStories=()=>{
    firebase.database().ref('/posts/').on('value',snapshot=>{
      let stories=[]
      if(snapshot.val()){
         Object.keys(snapshot.val()).forEach(function(key){
           stories.push({
             key:key,
             value:snapshot.val()[key]
           })
         })
      }
      this.setState({
        stories:stories
      })
      this.props.setUpdateToFalse()
    },
    function(errorObject){
      console.log('read feild'+errorObject.code)
    }
    )
  }
  async loadFonts(){
    await Font.loadAsync(costumFonts)
    this.setState({
      fontsLoded:true
    })
  }
  componentDidMount(){
    this.loadFonts()
    this.fetchUser()
    this.fetchStories()
  }

  keyExtractor=(item,index)=>{
    index.toString()

  }
  renderItem=({item:story})=>{
   return(
     <StoryCard story={story} navigation={this.props.navigation}/>
   )
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
             {!this.state.stories[0]?(
               <View style={styles.noStories}>
                 <Text style={this.state.lightTheme?styles.noStoriesTextLight:styles.noStoriesText}>
                     NO STORIES AVILABLE
                 </Text>
               </View>
             ):(
              <View style={styles.CardContainer}>
              <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
              />

            </View>
             )}
            

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
  appTitleContainer:{
flex:0.7,
justifyContent:"center"
  },
  CardContainer:{
    flex:0.95,

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
  noStories:{
    flex:0.85,
    justifyContent:'center',
    alignItems:'center'
  },
  noStoriesTextLight:{
    color:'black',
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(40)
  },
  noStoriesTextL:{
    color:'white',
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(40)
  }

})

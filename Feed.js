
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'




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
             <View style={styles.CardContainer}>
               <FlatList
               keyExtractor={this.keyExtractor}
               data={stories}
               renderItem={this.renderItem}
               />

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
  appTitleContainer:{
flex:0.7,
justifyContent:"center"
  },
  CardContainer:{
    flex:0.95,

  }

})

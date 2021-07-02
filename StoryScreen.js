
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, ScrollView, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Speech from 'expo-speech'

let costumFonts={'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class StoryScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fontsLoded:false,
      speakerColor:'gray',
      speakerIcon:'volume-high-outline'
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
  async initiateTTS(title,author,story,moral){
      const currentColor=this.state.speakerColor
      this.setstate({
          speakerColor:currentColor==='gray'?'aqua':'gray'
      })
      if(currentColor==='gray'){
          Speech.speak(`${title} by ${author}`)
          Speech.speak(story)
          Speech.speak('the moral of the story is')
          Speech.speak(moral)
         }
         else{
             Speech.stop()
         }
  }

  
    render(){
        if(!this.props.route.params){
            this.props.navigation.navigate(Home)
        }
         else if(!this.state.fontsLoded){
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
             <View style={styles.storyContainer}>
              <ScrollView style={styles.storyCard}>
                 <Image source={require('../assets/story_image_1.png')}/>
                 <View style={styles.dataContainer}>
                     <View style={styles.titleTextContainer}>
                         <Text style={styles.storyTitleText}>
                               {this.props.route.params.story.title}
                         </Text>
                         <Text style={styles.storyAuthorText}>
                               {this.props.route.params.story.author}

                         </Text>
                         <Text style={styles.storyAuthorText}>
                               {this.props.route.params.story.created_on}

                         </Text> 

                        </View>
                  <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      onPress={()=>{
                          this.initiateTTS(this.props.route.params.story.title,
                            this.props.route.params.story.author,
                            this.props.route.params.story.story,
                            this.props.route.params.story.moral
                            )
                      }}
                      >
                          <Ionicons name={this.state.speakerIcon}
                          size={RFValue(30)}
                          color={this.state.speakerColor}
                          style={{margin:RFValue(15)}}
                          />

                      </TouchableOpacity>
                      </View>      
                 </View>
                 <View> style={styles.storyTextContainer}
                       <Text style={styles.storyText}>
                           {this.props.route.params.story.story}

                       </Text>
                       <Text style={styles.storyText}>
                           {this.props.route.params.story.moral}

                       </Text>

                 </View>
                 <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                         <Ionicons name={'heart'} size={RFValue(25)} color={'white'} />
                         <Text style={styles.likeText}>
                         12k
                         </Text>
                        </View>

                    </View>

              </ScrollView>
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
    justifyContent:'center',
    alignItems:'center'
  },
  appTitleContainer:{
flex:0.7,
justifyContent:'center'
  },
  dataContainer:{
    flexDirection:"row",
    padding:RFValue(20)

  },
  storyContainer:{
      flex:1
  },
  titleTextContainer:{
      flex:0.8
  },
  storyTitleText:{
fontFamily:'Bubblegum-Sans',
fontSize:RFValue(25),
color:'white'
  },
  storyAuthorText:{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(18),
    color:'white'
      },
  iconContainer:{
      flex:0.2
  } ,
  storyTextContainer:{
padding:RFValue(20)
  }  ,
  storyText :{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(15),
    color:'white'
  },
  actionContainer:{
    padding:RFValue(10),
    justifyContent:'center',
    alignItems:'center'
},
likeButton:{
    width:RFValue(160),
    height:RFValue(40),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e51247',
    flexDirection:"row",
    borderRadius:RFValue(30),

},
likeText:{
  color:'white',
  fontFamily:'Bubblegum-Sans',
  fontSize:RFValue(25),
  marginLeft:RFValue(5)
}


})
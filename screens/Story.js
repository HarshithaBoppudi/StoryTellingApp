
import React from 'react';
import { StyleSheet,Alert,Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, ScrollView,TextInput, Button} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import DropDownPicker from 'react-native-dropdown-picker'
import firebase from 'firebase'



let costumFonts={'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let stories=require('./Temp_stories.json')

export default class Story extends React.Component {
  constructor(){
    super()
    this.state={
      fontsLoded:false,
      previewImage:'image_1',
      dropDownHeight:40,
      title:'',
      description:'',
      story:'',
      moral:'',
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
  async loadFonts(){
    await Font.loadAsync(costumFonts)
    this.setState({
      fontsLoded:true
    })
  }

  async addStory(){
    if(this.state.title&&this.state.moral&&this.state.description&&this.state.story){
      let storyData={
        previewImage:this.state.previewImage,
        title:this.state.title,
        description:this.state.description,
        story:this.state.story,
        moral:this.state.moral,
        author:firebase.auth().currentUser.displayName,
        created_on:new Date(),
        author_uid:firebase.auth().currentUser.uid,
        likes:0


      }
      await firebase.database().ref('/posts/'+Math.random().toString(36).slice(5)).set(storyData)
      .then(function(snapshot){

      })
      this.props.navigation.navigate('Feed')
      this.props.setUpdateToTrue() 
    }
    else{
       Alert.alert('error','all feilds required',[{text:'OK',onPress:()=>console.log('ok pressed')}],
       {
         cancelable:false
       }
       )  
    }
  }
  componentDidMount(){
    this.loadFonts()
    this.fetchUser()
  }

  keyExtractor=(item,index)=>{
    index.toString()

  }
  renderItem=({item:story})=>{
   return(
     <StoryCard story={story}/>
   )
  }
    render(){
         if(!this.state.fontsLoded){
           return( 
             <AppLoading/>
           )
         }
       else{
         let preview_Images={
           image_1:require('../assets/story_image_1.png'),
           image_2:require('../assets/story_image_2.png'),
           image_3:require('../assets/story_image_3.png'),
           image_4:require('../assets/story_image_4.png'),
           image_5:require('../assets/story_image_5.png'),
         }
         return(
           <View style={this.state.lightTheme?styles.cardContainerLight:styles.cardContainer}>
             <SafeAreaView style={styles.droidView}/>
             <View style={styles.appTitle}>
               <View style={styles.appIcon}>
                 <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
                  
               </View>

               <View style={styles.appTitleContainer}>
                 <Text style={this.state.lightTheme?styles.textContainerLight:styles.textContainer}>
                   Create New Story</Text>

               </View>

             </View>
             <View style={styles.feildContainer} >
             <ScrollView>
               <Image source={preview_Images[this.state.previewImage]} style={{width:'90%',height:RFValue(250),alignSelf:"center",resizeMode:'contain'}}/>
               <View style={{height:RFValue(this.state.dropDownHeight)}}>
               <DropDownPicker 
               items={[
                 {label:'image1',value:'image_1'},
                 {label:'image2',value:'image_2'},
                 {label:'image3',value:'image_3'},
                 {label:'image4',value:'image_4'},
                 {label:'image5',value:'image_5'},
                   
               ]}
               defaultValue={this.state.previewImage}
               containerStyle={{height:40,borderRadius:20,marginBottom:10}}
               onOpen={()=>{
                 this.setState({
                   dropDownHeight:170
                 })
               }}
               onClose={()=>{
                this.setState({
                  dropDownHeight:40
                })
              }}
              onChangeItem={item=>{
                this.setState({
                  previewImage:item.value
                })
              }}
              itemStyle={{justifyContent:'flex-start'}}
              style={{backgroundColor:'transparent'}}
              labelStyle={{color:'red',fontFamily:'Bubblegum-Sans'}}

               />
               </View>
            <TextInput
            style={styles.inputFont}
            placeholder={'title'}
            placeholderTextColor='red'
            onChangeText={text=>{
              this.setState({
                title:text
              })
            }}
            />
            <TextInput
            style={styles.discreptionFont}
            placeholder={'description'}
            placeholderTextColor='red'
            multiline={true}
            numberOfLines={5}
            onChangeText={text=>{
              this.setState({
                description:text
              })
             }}
            />
            <TextInput
            style={styles.storyFont}
            placeholder={'story'}
            placeholderTextColor='red'
            multiline={true}
            numberOfLines={30}
            onChangeText={text=>{
              this.setState({
                story:text
              })
            }}
            />
            <TextInput
            style={styles.moralFont}
            placeholder={'moral'}
            placeholderTextColor='red'
            onChangeText={text=>{
              this.setState({
                moral:text
              })
            }}
            />
              <View style={styles.submitButton}>
                  <Button title='SUBMIT'
                  color='purple'
                  onPress={()=>{
                    this.addStory()
                  }}
                  />
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
    justifyContent:"center",
    alignItems:"center"
  },
  appTitleContainer:{
flex:0.7,
justifyContent:"center"
  },
  feildContainer:{
    flex:0.85

  },
  inputFont:{
     height:RFValue(40),
     //width:RFValue(),
     borderRadius:RFValue(10),
     color:'white',
     fontFamily:'Bubblegum-Sans',
     borderWidth:RFValue(1),
     fontSize:35
  },
  discreptionFont:{
    height:RFValue(40),
   // width:RFValue(),
    borderRadius:RFValue(10),
    color:'white',
    fontFamily:'Bubblegum-Sans',
    borderWidth:RFValue(1),
    marginTop:15,
    textAlignVertical:'top',
    fontSize:30
  },
  storyFont:{
    height:RFValue(40),
   // width:RFValue(),
    borderRadius:RFValue(10),
    color:'white',
    fontFamily:'Bubblegum-Sans',
    borderWidth:RFValue(1),
    marginTop:20,
    textAlignVertical:'top',
    fontSize:25
  },
  moralFont:{
    height:RFValue(40),
    //width:RFValue(),
    borderRadius:RFValue(10),
    color:'white',
    fontFamily:'Bubblegum-Sans',
    borderWidth:RFValue(1),
    marginTop:25,
    textAlignVertical:'top',
    fontSize:25
  },
  cardContainer:{
    margin:RFValue(13),
    backgroundColor:'#254377',
    borderRadius:15

},
cardContainerLight:{
  margin:RFValue(13),
  backgroundColor:'white',
  borderRadius:15

},
textContainer:{
  color:'white',
  fontSize:RFValue(28),
  fontFamily:'Bubblegum-Sans'
},
textContainerLight:{
  color:'black',
  fontSize:RFValue(28),
  fontFamily:'Bubblegum-Sans'
},
submitButton:{
  marginTop:RFValue(20),
  alignItems:'center',
  justifyContent:'center'
}

})
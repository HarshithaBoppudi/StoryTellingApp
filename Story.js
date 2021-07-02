
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, ScrollView,TextInput} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import StoryCard from './StoryCard'
import DropDownPicker from 'react-native-dropdown-picker'




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
      moral:''
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
           <View style={{flex:1,backgroundColor:'#2072d6'}}>
             <SafeAreaView style={styles.droidView}/>
             <View style={styles.appTitle}>
               <View style={styles.appIcon}>
                 <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
                  
               </View>

               <View style={styles.appTitleContainer}>
                 <Text style={{color:'white',fontSize:RFValue(28),fontFamily:'Bubblegum-Sans'}}>
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
              labelStyle={{color:'white',fontFamily:'Bubblegum-Sans'}}

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
     width:RFValue(),
     borderRadius:RFValue(10),
     color:'white',
     fontFamily:'Bubblegum-Sans',
     borderWidth:RFValue(1),
     fontSize:35
  },
  discreptionFont:{
    height:RFValue(40),
    width:RFValue(),
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
    width:RFValue(),
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
    width:RFValue(),
    borderRadius:RFValue(10),
    color:'white',
    fontFamily:'Bubblegum-Sans',
    borderWidth:RFValue(1),
    marginTop:25,
    textAlignVertical:'top',
    fontSize:25
  }

})
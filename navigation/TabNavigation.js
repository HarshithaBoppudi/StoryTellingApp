import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Story from '../screens/Story'
import Feed from '../screens/Feed'
import { RFValue } from 'react-native-responsive-fontsize';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase  from 'firebase';
const Tab=createMaterialBottomTabNavigator()
 export default class BottomTabNavigator extends React.Component{
     constructor(){
         super()
         this.state={
             lightTheme:true,
             isUpdated:false
         }
     }
 renderFeed=(props)=>{
return(
    <Feed setUpdateToFalse={this.removeUpdated} {...props}/>
)
 }  
 
 renderStory=(props)=>{
    return(
        <Story setUpdateToTrue={this.changeUpdated} {...props}/>
    )
     }

 changeUpdated=()=>{
     this.setState({
         isUpdated:true
     })
 }
 removeUpdated=()=>{
    this.setState({
        isUpdated:false
    })
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

return(
    <Tab.Navigator
    labeled={false}
    barStyle={this.state.lightTheme?styles.bottonTabStyleLight:styles.bottonTabStyle}
    screenOptions={({route})=>(
        {
            tabBarIcon:({focused,color,size})=>{
                let iconName
                if(route.name==='Feed'){
                    iconName=focused?'home':'home-outline'
                    
                }
                else if(route.name==='Story'){
                    iconName=focused?'add-circle':'add-circle-outline'
                }
                return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icon}/>
            }
        }
    )}
    activeColor={'tomato'}
    inactiveColor={'grey'}
    
    >
        <Tab.Screen name='Feed' component={this.renderFeed}
        options={{unmountOnBlur:true}}
        />

        <Tab.Screen name='Story' component={this.renderStory}
          options={{unmountOnBlur:true}}
        />

    </Tab.Navigator>
)
    }
}


const styles=StyleSheet.create({
    bottonTabStyle:{
        backgroundColor:'#254377',
        height:'5%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
       
        position:'absolute'
    },
    bottonTabStyleLight:{
        backgroundColor:'white',
        height:'5%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
       
        position:'absolute'
    },
    icon:{
        width:RFValue(30),
        height:RFValue(30),


    }
})
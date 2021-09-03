import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import TabNavigator from './TabNavigation'
import Profile from '../screens/Profile'
import StackNavigator from './StackNavigator';
import LogOutScreen from '../screens/LogOutScreen';
import CustomSideBarMenu from '../screens/CustomSideBarMenu';
import firebase from 'firebase';

const Drawer=createDrawerNavigator()
export default class DrawerNavigator extends Component{
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
        <Drawer.Navigator 
drawerContentOptions={{activeTintColor:'#e91e63',
inactiveTintColor:this.state.lightTheme?'black':'white',
itemStyle:{marginVertical:5}
                     }}
    drawerContent={props=><CustomSideBarMenu {...props}/>}                 
        >
            <Drawer.Screen name='Home' component={StackNavigator}
            options={{unmountOnBlur:true}}
            />
            <Drawer.Screen name='Profile' component={Profile}
            options={{unmountOnBlur:true}}
            />
            <Drawer.Screen name='LogOut' component={LogOutScreen}
            options={{unmountOnBlur:true}}
            />
        </Drawer.Navigator >
    )
 }
    }


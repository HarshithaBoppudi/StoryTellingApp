import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import TabNavigator from './TabNavigation'
import Profile from '../screens/Profile'
import StackNavigator from './StackNavigator';
import LogOutScreen from '../screens/LogOutScreen';
const Drawer=createDrawerNavigator()
const DrawerNavigator=()=>{
    return(
        <Drawer.Navigator>
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
export default DrawerNavigator
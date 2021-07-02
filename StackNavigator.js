import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import TabNavigator from './TabNavigation'
import StoryScreen from '../screens/StoryScreen'

const Stack=createStackNavigator()
const StackNavigator=()=>{
    return(
        <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen
            name='Home' component={TabNavigator}
            />
            <Stack.Screen
            name='StoryScreen' component={StoryScreen}
            />

        </Stack.Navigator>
    )
}
 
export default StackNavigator



import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Story from '../screens/Story'
import Feed from '../screens/Feed'
import { RFValue } from 'react-native-responsive-fontsize';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab=createMaterialBottomTabNavigator()
 const BottomTabNavigator=()=>{
return(
    <Tab.Navigator
    labeled={false}
    barStyle={styles.bottonTabStyle}
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
        <Tab.Screen name='Feed' component={Feed}/>
        <Tab.Screen name='Story' component={Story}/>

    </Tab.Navigator>
)
}
export default BottomTabNavigator

const styles=StyleSheet.create={
    bottonTabStyle:{
        backgroundColor:'#254377',
        height:'5%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:'Hidden',
        position:'absolute'
    },
    icon:{
        width:RFValue(30),
        height:RFValue(30),


    }
}
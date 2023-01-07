import React, { useEffect, useState } from "react"
import { Alert, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "./src/Screens/Home"
import CategoriesScreen from "./src/Screens/Categories"
import NotificationScreen from "./src/Screens/Notifications"
import AccountScreen from "./src/Screens/Account"
import CardScreen from "./src/Screens/Card"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import AsyncStorage from "@react-native-async-storage/async-storage";



const Tab = createMaterialBottomTabNavigator();
const stack = createStackNavigator();
const App = () => {
 
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = 'home';
              size = focused ? 20 : 18
              color = focused ? "rgba(255,0,0,0.6)" : "green"
            } else if (route.name === "Categories") {
              iconName = 'receipt';
              size = focused ? 20 : 18
              color = focused ? "rgba(255,0,0,0.6)" : "green"
            }
            else if (route.name === "Message") {
              iconName ='envelope';
              size = focused ? 20 : 18
              color = focused ? "rgba(255,0,0,0.6)" : "green"
            }
            else if (route.name === "Account") {
              iconName = "users";
              size = focused ? 20 : 18
              color = focused ? "rgba(255,0,0,0.6)" : "green"
            } else if (route.name === "Cart") {
              iconName = "truck";
              size = focused ? 20 : 18
              color = focused ? "rgba(255,0,0,0.6)" : "green"
            }
            return (
              <FontAwesome
                name={iconName}
                size={size}
                color={color}
              />

            )

          }
        })

        }
        /* tabBarOptions={{
         activeTintColor:"blue",
         inactiveTintColor:"black",
        labelStyle:{fontSize:19},
        showLabel:false
       // activeBackgroundColor:"red",
        //inactiveBackgroundColor:"green",
       }
       }  */
        activeColor="red"
        inactiveColor="black"

        barStyle={{
          backgroundColor: "white",
          padding: 5

        }}

      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        
        <Tab.Screen
          name="Message"
          component={NotificationScreen}
          options={{ tabBarBadge:"",
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}

        >     
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          component={CardScreen}
          options={{ tabBarBadge:"",
          }}
        />
      </Tab.Navigator>    
    </NavigationContainer>
    
  )
}
export default App;
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Alert, NativeModules, StyleSheet } from "react-native"
import styles from "../utils/GlobalStyle"
import { createStackNavigator } from '@react-navigation/stack'
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import Login from "./Forms/Login"
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import Register from "../Screens/Forms/Register"
import Myitem from './Forms/Myitem'
import Orders from './Orders' 
import  SQLiteDatabase  from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
const stack = createStackNavigator();

const db = SQLiteDatabase.openDatabase({
  name:"Register",
  location:"default"
},
()=>{},
error=>{console.log(error)})
const Acc = ({ navigation }) => {
  const [name, setname] = useState("");
  const [check, setcheck] = useState(null);
  
  const logout = async() =>{
   await AsyncStorage.setItem("Loggedin","");
   await AsyncStorage.setItem("address","");
   setcheck(null)
   setname("?");
  }
  const getData = async()=>{
    var email = await AsyncStorage.getItem("Loggedin");
    setcheck(email)
    await db.transaction(async(tx)=>{
      await tx.executeSql(
        "SELECT * FROM users WHERE email=?",
        [email],
        (tx,results)=>{
            var name1 = results.rows.item(0).fname +"  "+ results.rows.item(0).lname 
            setname(name1);
        })})
  }
  const ag = () => {
    navigation.navigate("Login",{fun:getData});
  }
  useEffect(()=>{
    getData(); 
  }) 
  return (<ScrollView>
    <View style={styles.body}>

      <View style={{
        paddingTop: 50,
        flexDirection: "row",
        marginBottom: 5,
        paddingBottom: 40,
        backgroundColor: "rgba(255,160,160,0.3)"

      }}>
        <Text style={{
          marginLeft: 30,
          borderRadius: 50,
          paddingHorizontal: 30,
          paddingVertical: 20,
          fontSize: 60,
          fontWeight: "bold",
          backgroundColor: "pink",
          color: "green"

        }}>{name[0]}</Text>
        <Text
          style={{
            marginTop: 30,
            marginLeft: 30,
            fontSize: 30,
            color: "black"
          }}
        >{name}</Text>
      </View>
      <View style={{
        paddingVertical: 50,
        backgroundColor: "rgba(255,160,160,0.3)",
      }}>
        <Pressable/>

        
        <Pressable onPress={() => navigation.navigate("Orders")}
          style={{
            paddingVertical: 5,
            borderBottomWidth: 1
          }}
          android_ripple={{ color: "rgba(255,160,160,0.5)" }}
        >
          <View style={{ flexDirection: "row", marginLeft: 20, marginBottom: 5 }}>
            <FontAwesome name="box" size={18} color="" style={{ marginTop: 10 }} />
            <Text style={{ fontSize: 23, marginTop: 8, marginLeft: 20, color: "black", fontWeight: "lighter" }}>Orders</Text>
          </View>
        </Pressable>
        <Pressable>
        </Pressable>
        
        <Pressable style={Styles.loginbtn}>
          {check === null ? <Text style={Styles.text}  onPress={ag}>Login</Text> : <Text style={Styles.text}  onPress={logout}>Logout</Text>}
        </Pressable>
        
      </View>

    </View>
  </ScrollView>
  )
};
const Styles = StyleSheet.create({
  loginbtn: {
    backgroundColor: "red",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical:40,
    


  },
  text:{
    fontSize:20,
    color:"white",
    textAlign:"center",
  }
})

const Account = () => {
  return (
    <stack.Navigator initialRouteName='Acc1'>
      <stack.Screen
        name="Acc1"
        component={Acc}
        options={{ header: () => null }}
      />
      <stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <stack.Screen
        name="Myitem"
        component={Myitem}
        options={{ header: () => null }}
      />
      <stack.Screen
        name="Orders"
        component={Orders}
        options={{ header: () => null }}
      />
    </stack.Navigator>


  )
}

export default Account
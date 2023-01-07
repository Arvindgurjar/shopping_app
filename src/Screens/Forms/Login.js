import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {  useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from "react-native"
import { ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import SQLiteDatabase from 'react-native-sqlite-storage'
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const db = SQLiteDatabase.openDatabase({
  name: "Register",
  location: "default"
},
  () => { },
  error => { console.log(error) })

const Login = ({ navigation, route }) => {
  const [show, setshow] = useState(true);
  const [login, setlogin] = useState({
    Email: "",
    Password: ""
  })
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  
  const Lchange = (text, input) => {

    setlogin((prev) => ({ ...prev, [input]: text }))
  }
  const showpassword = () => {
    setshow(!show)
  }
  const Login = async () => {
    if (!login.Email || !login.Password) {
      Alert.alert("Warning", "Please fill Details")
    }else if(login.Email.search(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)==-1)
    {
      setemail("*");
      
    }else if(login.Password.search(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)==-1)
    {
      setpassword("*");
      setemail("");
      
    }
    else {
      setpassword("");
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT * FROM users WHERE email=? AND password=?",
          [login.Email, login.Password],
          async (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              Alert.alert("success", "Login Successfull");
              await AsyncStorage.setItem("Loggedin", login.Email);
                  navigation.goBack();
                  route.params.fun();
                 
                  navigation.navigate("Home")
                 
            }
            else {
              Alert.alert("Warning", "Invalid Credantial");
            }
          }
        )
      })
    }
  }
  return (
    <ScrollView>
      <View style={styles.body}>
        <Image style={styles.img} source={require("../../images/blank-profile-picture-973460__340.webp")} />
        <Text style={styles.text}>Email Id</Text>
        <TextInput style={styles.input} placeholder="Enter Email Address" onChangeText={(text) => { Lchange(text, "Email") }} />
        <Text style={styles.erfield}>{email}</Text>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={show} placeholder="Enter Password" onChangeText={(text) => { Lchange(text, "Password") }} />
        {show ? <Text style={styles.pshow} onPress={showpassword}>show</Text> : <Text style={styles.pshow} onPress={showpassword}>Hide</Text>}
        <Text style={styles.erfield}>{password}</Text>
        <Button style={styles.login} onPress={Login}>Login</Button>
        <Text style={styles.Rtext} onPress={() => navigation.navigate("Register",{fun:route.params.fun})}>Do Not Have Account</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#9BB7D4",
    marginHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    justContent: 'center',
    alignItems: 'center',
    marginVertical: 130

  },
  img: {
    height: 120,
    width: 120,
    marginVertical: 30,
    borderRadius: 100

  },
  input: {
    width: "90%",
    height: 40
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    color: "black",
    marginLeft: "-65%",
    marginVertical: 5

  },
  login: {
    backgroundColor: "green",
    width: "80%",
    marginTop: 30,
    marginBottom: 10,


  },
  Rtext: {
    fontSize: 15,
    marginBottom: 40
  },
  pshow: {
    marginTop: -39,
    marginLeft: "80%",
    padding: 10,
    backgroundColor: "grey",
    color: "white"
  },
   erfield:{color:"red",marginTop:-40,marginBottom:-14,marginLeft:270,fontSize:50},
})

export default Login
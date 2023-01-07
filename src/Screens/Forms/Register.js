import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from "react-native"
import { ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import  SQLiteDatabase  from 'react-native-sqlite-storage'
const db = SQLiteDatabase.openDatabase({
  name:"Register",
  location:"default"
},
()=>{},
error=>{console.log(error)})

const Register = ({navigation,route}) => {
  const [show,setshow] = useState(true);
  const [detail,setdetail] = useState({
    fname:"",
    lname:"",
    Email:"",
    Password:""
  })
  const [fname,setfname] = useState("")
  const [lname,setlname] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  
  const showpassword = ()=>{
    setshow(!show)
  }
  const Rchange = (text ,input)=>{
    setdetail((prev)=>({...prev,[input]:text}))
  }
  const submit= async()=>{
    if(!detail.fname || !detail.lname || !detail.Email || !detail.Password)
    {
        Alert.alert("Warning","Please fill details");
        
    }else if(detail.fname.length<3)
    {
      setfname("*");
    }else if(detail.lname.length<3){
        setlname("*");
        setfname("");
    }else if(detail.Email.search(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)==-1)
    {
      setemail("*");
      setlname("");
        setfname("");
    }else if(detail.Password.search(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)==-1)
    {
      setpassword("*");
      setemail("");
      setlname("");
        setfname("");
    }
    else 
    { setpassword("");
     try{
      await db.transaction(async(tx)=>{
        await tx.executeSql(
          "INSERT INTO users (fname, lname, email,password) VALUES (?,?,?,?)",
          [detail.fname,detail.lname,detail.Email,detail.Password],
          ()=>{Alert.alert("success","successfully register") 
                navigation.navigate("Login",{fun:route.params.fun});},
                error=>{console.log(error)}
        )
        
        
      })
    
     }catch{
      Alert.alert("Warning","data not store");
     }
    }
  }
  const createtable = ()=>{
    db.transaction((tx)=>{
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, fname VARCHAR(30),lname VARCHAR(30), email VARCHAR(255),password INT(15))',
        []
      )
    })
    }
  useEffect(()=>{
    createtable();
  },[])
  
  return (
    <ScrollView>
      <View style={styles.body}>
        <Image style={styles.img} source={require("../../images/blank-profile-picture-973460__340.webp")} />
        <Text style={styles.text}>First Name</Text>
        <TextInput style={styles.input} placeholder="Enter Your First Name" onChangeText={(text)=>{Rchange(text,"fname")}}/>
        <Text style={styles.erfield}>{fname}</Text>
        <Text style={styles.text}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter Your Last Name" onChangeText={(text)=>{Rchange(text,"lname")}}/>
        <Text style={styles.erfield}>{lname}</Text>
        <Text style={styles.text}>Email Id</Text>
        <TextInput style={styles.input} placeholder="Enter Email Address" onChangeText={(text)=>{Rchange(text,"Email")}}/>
        <Text style={styles.erfield}>{email}</Text>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={show} placeholder="Enter Password" onChangeText={(text)=>{Rchange(text,"Password")}}/>
        {show?<Text style={styles.pshow} onPress={showpassword}>show</Text>:<Text style={styles.pshow} onPress={showpassword}>Hide</Text>}
        <Text style={styles.erfield}>{password}</Text>
        <Button style={styles.login} onPress={submit}>Register</Button>
        <Text style={styles.Rtext} onPress={()=>navigation.navigate("Login")}>Already Register</Text>
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
    marginVertical:50
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
  login:{
    backgroundColor:"green",
    width:"80%",
    marginTop:30,
    marginBottom:10,
    },
    Rtext:{
      fontSize:15,
      marginBottom:40
    },
    pshow:{
      marginTop:-39,
      marginLeft:"80%",
      padding:10,
      backgroundColor:"grey",
      color:"white"
    },
    erfield:{color:"red",marginTop:-40,marginBottom:-14,marginLeft:270,fontSize:50},
})

export default Register
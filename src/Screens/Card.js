import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native"
import Logo from './logo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper'
import SQLiteDatabase from 'react-native-sqlite-storage'
const db = SQLiteDatabase.openDatabase({
  name: "Register",
  location: "default"
},
  () => { },
  error => { console.log(error) })
const Card = ({navigation}) => {
  const [Data, setData] = useState([])
  const [login,setlogin] = useState(null)
  const [value,setvalue] = useState(0);
  const Removecard = async (i) => {
    const dt = JSON.parse(await AsyncStorage.getItem("@Card:key"))
    AsyncStorage.setItem("@Card:key", JSON.stringify([...dt.filter((item) => item.id !== i)]));

  }
  const order = async() => {
  await db.transaction(async(tx)=>{
    for(var i=0;i<Data.length;i++)
    {
      await tx.executeSql(
      "INSERT INTO orders (email,Iid) VALUES (?,?)",
       [login,Data[i].id],
       ()=>{Alert.alert("Success","Order Placed successfully")},
        error => {console.log(error)}
      )
      
    }
    await  AsyncStorage.setItem("@Card:key", JSON.stringify([]));
    await AsyncStorage.setItem("address","XYZ/c S-H scheme no. JKL Aranya Nagar , Vijay Nagar Indore (MP) Near Manindra Showroom or Dewas Naka");
   })
  }
  const log = ()=>{
    Alert.alert("Warning" , "Login Please");
    //navigation.navigate("Login");
  }
   const check = async()=>{
    const email = await AsyncStorage.getItem("Loggedin");
     setlogin(email)
     const len = Data.length
     setvalue(len);
   }
  const getData = async () => {
    const Data1 = await AsyncStorage.getItem("@Card:key")
    setData([...JSON.parse(Data1)]);
  }
  const createtable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(30),Iid VARCHAR(15))',
        []
      )
    })
  }
  useEffect(() => {
    
    createtable();
   
  },[])
  useEffect(()=>{
    getData();
    check();
  })
  return (
    <View>

      <Logo />
      <ScrollView style={{ marginBottom: 70 }}>


        <View style={styles.items}>
          {
            Data.map((item, index) => {
              return <View key={index}>
                <View style={styles.Sitem}>
                <Image style={styles.itemimg} source={item.img} />
                <Image style={styles.itemimg} source={item.img1} />
                  <View style={{marginHorizontal:10,marginTop:10}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{item.name}</Text>
                    <View><Text style={{fontSize:15,marginTop:10}}>{item.des}</Text></View>
                    <Text style={{fontSize:15}}>Colors : {item.color}</Text>
                    <Text style={{fontSize:15}}>Size : {item.size}</Text>
                  </View>

                </View>
                <Button style={styles.btn} onPress={() => Removecard(item.id)}>Remove From Card</Button>
              </View>
            })
          }
        </View>
       {(value>0) ? <Button style={styles.orders} onPress={login!==null?order:log}><Text style={{color:"white",fontWeight:"bold",fontSize:17}}>Place Order</Text></Button>:""}
      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  ima: {
    height: 240,
    width: "100%",
    marginVertical: 10

  },
  items: {
    flexDirection: "column",
  },
  Sitem: {
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: "row"
  },
  itemimg: {
    height: 130,
    width: 70,
    marginHorizontal:4,
    borderRadius:10
  },
  btn: {
    backgroundColor: "lightblue",
    marginTop: -20,
    color: "black"
  },
  orders:{
    backgroundColor:"green",
    marginVertical:10,
    paddingVertical:5,
    marginHorizontal:10,
    borderRadius:20,
  }
})
export default Card 
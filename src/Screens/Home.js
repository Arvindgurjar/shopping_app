import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native"
import Logo from './logo'
import { Data } from "./Forms/items"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper'

const Home = () => {
   
  const Addcard = async (i) => {
    const dt = JSON.parse(await AsyncStorage.getItem("@Card:key"))
   await AsyncStorage.setItem("@Card:key", JSON.stringify([...dt, Data.find((e) => e.id === i)]));

  }
  useEffect(()=>{
    async()=>{
  await  AsyncStorage.setItem("@Card:key", JSON.stringify([]));
  await AsyncStorage.setItem("@Order:key", JSON.stringify([]));
  }},[])
  return (
    <View>

      <Logo />
      <ScrollView style={{ marginBottom: 70 }}>
        <Image style={styles.ima} source={require("../images/carousel/3.webp")} />

        <View style={styles.items}>
          {
            Data.map((item, index) => {
              return <View key={index}>
                <View  style={styles.Sitem}>
                  <Image style={styles.itemimg} source={item.img} />
                  <Image style={styles.itemimg} source={item.img1} />
                  <View style={{marginHorizontal:10,marginTop:10}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{item.name}</Text>
                    <View><Text style={{fontSize:14.5,marginTop:10}}>{item.des}</Text></View>
                    <Text style={{fontSize:15}}>Colors : {item.color}</Text>
                    <Text style={{fontSize:15}}>Size : {item.size}</Text>
                  </View>

                </View>
                <Button style={styles.btn} onPress={() => Addcard(item.id)}>Add To Card</Button>
              </View>
            })
          }
        </View>
        
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
  btn:{
    backgroundColor:"lightblue",
    marginTop:-20,
    color:"black"
  }
})
export default Home
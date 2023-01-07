import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text } from "react-native"
import Logo from './logo';
import styles from "../utils/GlobalStyle"
const Notifications = () => {
  const [address,setaddress] = useState('');
  const getData =async ()=>{
     const a = await AsyncStorage.getItem("address");
     setaddress(a);
  }
  useEffect(()=>{
   getData();
  },[])
  return (
    <View style={styles.body}>
      <Logo/>
      {address!=null?<View style={{marginTop:40,marginHorizontal:30}}>
        <Text style={{fontSize:25,fontWeight:"bold",marginVertical:10}}> Pick up Address </Text>
      <View>
        <Text style={{fontSize:20,marginHorizontal:13}}>
          {address}
        </Text>
        <Text style={{marginHorizontal:15,fontSize:14,marginTop:20,color:"red"}}>
         **  If You are unable to pick up. Please  contact On XXXXXXXXX
        </Text>
      </View>
      </View>:''}
    </View>)
}
export default Notifications
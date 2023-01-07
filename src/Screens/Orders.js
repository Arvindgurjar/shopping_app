import { View, Text ,StyleSheet,ScrollView, Alert,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from './logo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import  SQLiteDatabase  from 'react-native-sqlite-storage'
import { Data } from './Forms/items';
const db = SQLiteDatabase.openDatabase({
  name:"Register",
  location:"default"
},
()=>{},
error=>{console.log(error)})
const Orders = () => {
  const [data1,setdata1] = useState([]);
  //const [Adata,setAdata] = useState([])

  const getData = async()=>{
  const email = await AsyncStorage.getItem("Loggedin");
  await db.transaction(async(tx)=>{
    await tx.executeSql(
      "SELECT * FROM orders WHERE email=?",
      [email],
      (tx,result)=>{
        const len = result.rows.length;
          for(var i=0;i<len;i++){
            const it = result.rows.item(i).Iid;
            const iten = Data.find((e)=>e.id == it)
            if(iten!=undefined)
            setdata1([...data1,iten]);    
        }    
      }
    )
   } 
  )
  }
  // console.log(data1);
 
  //console.log(Adata);
useEffect(()=>{
  getData();
},[])
    

    return (
      <View>
  
        <Logo />
        <ScrollView style={{ marginBottom: 70 }}>
  
  
          <View style={styles.items}>
            {
               data1.map((item, index) => {
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
    btn: {
      backgroundColor: "lightblue",
      marginTop: -20,
      color: "black"
    }
  })
export default Orders
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const Myitem = ({ navigation }) => {
    return (
        <View>
            <Button style={styles.additembody} onPress={()=>navigation.navigate("Additem")}>
                <Text style={styles.additemtext}> Add New Product </Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    additembody: {
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 40
    },
    additemtext: {
        fontSize: 20,
        color: "white",
    }
})

export default Myitem
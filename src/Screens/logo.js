import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const logo = () => {
    return (
        <View style={styles.mainview}>
            <View style={styles.logoview}>
                <Text style={styles.text1}>SFY</Text>
            </View>
            <View>
                <Text style={styles.text}>Shopify</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainview: {
        flexDirection: "row",
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    logoview: {
        backgroundColor: "blue",
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5

    },
    text: {
        fontSize: 30,
        color: "blue",
        marginHorizontal: 15,

    },
    text1: {
        fontSize:25,
        color:"white",
        fontFamily:"cursive",

    }
})

export default logo
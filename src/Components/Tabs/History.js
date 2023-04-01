import React from 'react';
import {Text, View,StyleSheet} from "react-native";

const NoHistory=()=>{
    return(
        <View style={{backgroundColor:'white',flex:1}}>
            <Text style={styles.title}>History</Text>
            <Text style={styles.info}>No history. Your future trips will appear here. Publish a record faster or look for favorable conditions for yourself!</Text>
        </View>
    )
}

const History = () => {
    return (
        <View style={{flex:1}}>
            <NoHistory/>
        </View>
    );
};
const styles=StyleSheet.create({
    title:{
        color:'#111111',
        fontSize:25,
        fontWeight:'bold',
        padding:30
    },
    info:{
        paddingHorizontal:30,
        color:'#111111',
        fontSize:20,
    }
})
export default History;
import React from 'react';
import {Text, View,StyleSheet} from "react-native";

const NoMessage=()=>{
    return(
        <View style={{backgroundColor:'white',flex:1}}>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.info}>No messages. Here will be the history of your correspondence.</Text>
        </View>
    )
}

const Message = () => {
    return (
        <View style={{flex:1}}>
           <NoMessage/>
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
export default Message;
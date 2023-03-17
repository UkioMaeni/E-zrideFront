import React from 'react';
import {Button, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";

function Home(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#22c686' }}>
            <Text style={styles.text}>Easy ride</Text>
            <Text style={styles.textReg}>Registration</Text>
            <StatusBar />
            <View style={{width:'100%',alignItems:'center'}}>
                <Text>Enter you number</Text>
                <TextInput style={styles.textInput} keyboardType={'phone-pad'}/>
                <Button title={'CONTINUE'}/>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        width:'60%',
        height:40,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'blue',
        borderRadius:10
    },
    text:{
        color:'#da3c3c',
        fontSize:40,
        fontWeight:'bold',
        position:'absolute',
        top:'10%'
    },
    textReg:{
        color:'#382cd9',
        fontSize:30,
        fontWeight:'bold',
        position:'absolute',
        top:'20%'
    }
});



export default Home;
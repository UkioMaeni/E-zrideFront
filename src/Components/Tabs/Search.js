import React, {useEffect, useRef} from 'react';
import {Pressable, Text, View, StyleSheet, Animated, Easing, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useSelector} from "react-redux";

const Search = ({navigation}) => {
useEffect(()=>{

})
    return (
        <View style={styles.wrapper}>
            <View style={styles.modalView}>
                    <View style={styles.inputWrapper}>
                        <Icon name={'locate-outline'} size={35}/>
                        <TextInput style={styles.input} placeholder={'From...'}/>
                    </View>
                <View style={styles.inputWrapper}>
                    <Icon name={'locate-outline'} size={35}/>
                    <TextInput style={styles.input} placeholder={'To...'}/>
                </View>
                <View style={[styles.inputWrapper,]}>
                    <Icon name={'person-outline'} size={35}/>
                    <TextInput style={styles.input} value={'1'}/>
                </View>
                <View style={[styles.inputWrapper,{borderBottomWidth:0}]}>
                    <Icon name={'calendar-outline'} size={35}/>
                    <TextInput style={styles.input} placeholder={'Today...'} />
                </View>

                <Pressable style={styles.search}>
                    <Text style={styles.searchText}>Search</Text>
                </Pressable>

            </View>
        </View>
    );
};
const styles=StyleSheet.create({
    searchText:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
    search:{
        height:60,
        backgroundColor:'#0cb0ff',
        display:'flex',
        justifyContent:'center',
        width:'100%',
    },
    inputWrapper:{
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderBottomStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#cbbbbb',
        width:'100%',
    },
    input:{
        paddingLeft:10,
        fontWeight:'bold',
        fontSize:20,
        flex:1
    },
    modalView: {
        width:'80%',
        marginTop:'30%',
        display:'flex',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        overflow:'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    wrapper:{
        flex:1,
        display:'flex',
        alignItems:'center',
        backgroundColor:"white"

    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:30,
        height:100,
        width:120,
    }
})
export default Search;
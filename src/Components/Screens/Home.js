import React from 'react';
import {Button, Image, Pressable, StatusBar, StyleSheet, Text, View} from "react-native";
import car from '../../assets/img/title.png'
import {useDispatch} from "react-redux";
import {SET_STEP} from "../../store/reducers/authReducer";
function Home({navigation}){
    const dispatch=useDispatch()
    function handleToReg() {
        dispatch(SET_STEP('Registration'))
        navigation.navigate('Registration')
    }

    return(
        <View style={styles.wrapper}>
            <StatusBar />
           <Image style={styles.img} source={car}/>
            <Text style={styles.text}>Travel just got easier! Let`s go!</Text>
            <View style={styles.title}>
                <Pressable style={styles.btn1} onPressIn={handleToReg}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>SIGN-IN</Text>
                </Pressable>
                <Pressable style={styles.btn2} >
                    <Text style={{fontSize:16,color:'#00bbff',fontWeight:'bold'}}>LOG-IN</Text>
                </Pressable>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        backgroundColor:'white',
        display:'flex',
        justifyContent:'flex-start'
    },
    title:{
        width:'100%',
        alignItems:'center',
        position:'absolute',
        bottom:'5%'
    },
    img:{
        width:'100%',
        height:'60%',
        resizeMode:'stretch',
        backgroundColor:'#22bbf5'
    },
    btn1:{
        width:'80%',
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#00bbff',
        borderRadius:20,
        marginBottom:10
    },
    btn2:{
        width:'80%',
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#ffffff',
        borderRadius:20,
    },
    text:{
        fontWeight:'600',
        fontSize:35,
        color:'black',
        textAlign:'center',
        marginTop:'10%'
    }

});



export default Home;
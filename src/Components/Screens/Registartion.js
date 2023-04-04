import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View,KeyboardAvoidingView} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import generate from '../../assets/img/generate.jpg'
import confirm from '../../assets/img/confirm.jpg'
import {useDispatch, useSelector} from "react-redux";
import {SET_STEP} from "../../store/reducers/authReducer";
import {AuthService} from "../../http/service/authService";
import {SET_ACCESS, SET_CODE} from "../../store/reducers/userReducer";
import {setToken} from "../../AsyncStorage/setToken";
import {getToken} from "../../AsyncStorage/getToken";
import {UserService} from "../../http/service/userService";
const Registartion = ({navigation}) => {
    const {otp}=useSelector(state=>state.user)
    const [phone,setPhone]=useState('+1')
    const[code,setCode]=useState('')
    const [error,setError]=useState(false)
    const dispatch=useDispatch()
    const {step}=useSelector(state=>state.step)

    ////обработчик для input Number
    const handleChange=(e)=>{
        setPhone(e)
        if(error)setError(false)
    }
    ///кнопка отправки кода на номер
    function handleGenerate() {
        if(step==='Registration'){
            if(validationNumber(phone)){
                AuthService.registration(phone).then(otp=>{
                    console.log(otp)
                    dispatch(SET_CODE(otp))
                    dispatch(SET_STEP('Confirm'))
                })

            }else{
                setError(true)
            }
        }
        if(step==='Confirm'){
            AuthService.confirm(phone,code).then(({access,refresh})=>{
                setToken(access,refresh).then(()=>{
                    getToken().then(({access,refresh})=>{
                        dispatch(SET_ACCESS(access))
                        UserService.dataUser(access).then(()=>{}).catch(()=>{
                            navigation.navigate('UserInfo')
                        })

                    })
                })
            })
        }

    }
    ////// вариант для показа картинки,слов
    const variantImg={
        'Registration': <Image source={generate} style={styles.img}/>,
        'Confirm':<Image source={confirm} style={styles.img}/>
    }
    const varianText={
        'Registration':<Text style={styles.text}>Enter you Phone Number</Text>,
        'Confirm':<Text style={styles.text}>OTP Verification</Text>
    }
    const variantPostText={
        'Registration':<Text style={styles.textPre}>We will send you the <Text style={{fontWeight:'bold',}}>4 digit </Text>verification code</Text>,
        'Confirm':<Text style={styles.textPre}>Enter the OTP sent to <Text style={{fontWeight:'bold',}}>{phone}</Text></Text>
    }
    const variantInput={
        'Registration': <TextInput returnKeyType="send" onSubmitEditing={handleGenerate} style={{...styles.input,borderColor:error?'red':'#111111'}} keyboardType={"phone-pad"}  value={phone} onChangeText={handleChange}/>,
        'Confirm':<TextInput returnKeyType="send" onSubmitEditing={handleGenerate} style={styles.code} keyboardType={"number-pad"} maxLength={6} value={code} onChangeText={setCode}/>
    }

    const textBtn={
        'Registration':'GENERATE OTP',
        'Confirm':'VERIFY & CONTINUE'
    }

    ////валидация номера
    const validationNumber=(number)=>{
        const regExp=/^((\+1)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/
        return regExp.test(number)
    }


    ////обрааботчик отмены
    function handleCancel() {
        navigation.navigate('Home')
    }
    ///возврат к вводу телефона
    function handleBackToPhone() {
        setCode('')
        dispatch(SET_STEP('Registration'))
    }

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior="height">
            <View style={styles.cancel}>
                <Pressable onPressIn={handleCancel}>
                    <Icon name={'close-outline'} size={40} color={'blue'} solid/>
                </Pressable>
            </View>
            <View style={styles.inputWrapper}>
                <Text >Code {otp}</Text>
                {variantImg[step]}
                {varianText[step]}
                {variantPostText[step]}
                {variantInput[step]}
                {error?<Text style={{color:'red'}}>incorrect number format</Text>:null}
                <Pressable style={styles.btn1} onPressIn={handleGenerate}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>{textBtn[step]}</Text>
                </Pressable>
                {step==='Confirm'?
                    <Text style={styles.rephone}>
                        Incorrect Phone Number?
                        <Text onPress={handleBackToPhone}  style={{...styles.rephone,fontWeight:'bold',textDecorationLine:'underline'}}> Back</Text>
                    </Text>:null}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles=StyleSheet.create({
    wrapper:{
        backgroundColor:'white',
        flex:1,
        display:'flex',
    },
    cancel:{
        position:"absolute",
        top:5,
        left:5
    },
    inputWrapper:{
        marginTop:'15%',
        width:'100%',
        display:'flex',
        alignItems:'center',
    },
    img:{
        width:240,
        height:220
    },
    text:{
        marginTop:40,
        color:'#111111',
        fontSize:25,
        fontWeight:'bold',
        width:'100%',
        textAlign:'center'
    },
    textPre:{
        marginTop:10,
        fontSize:15,
        color:'#7e7b7b'
    },
    input:{
        marginTop:40,
        borderColor:'#111111',
        borderStyle:'solid',
        width:'90%',
        height:60,
        fontSize:20,
        borderWidth:1,
        borderRadius:7,
        paddingLeft:15
    },
    code:{
        fontSize:30,
        marginTop:40,
        borderWidth:1,
        borderColor:'#111111',
        borderStyle:'solid',
        width:'60%',
        height:60,
        fontWeight:'bold',
        borderRadius:7,
        textAlign:'center',
        letterSpacing:15
    },
    btn1:{
        width:'90%',
        display:'flex',
        alignItems:'center',
        padding:20,
        backgroundColor:'#00bbff',
        borderRadius:10,
        marginTop:40
    },
    rephone:{
        marginTop:20,
        fontSize:15,
    }
})
export default Registartion;


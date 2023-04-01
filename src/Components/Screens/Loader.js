import React, {useEffect} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet} from "react-native";
import loading from '../../assets/img/loading.jpg'
import {getToken} from "../../AsyncStorage/getToken";
import {useDispatch} from "react-redux";
import {SET_ACCESS} from "../../store/reducers/userReducer";
import {AuthService} from "../../http/service/authService";
import {setToken} from "../../AsyncStorage/setToken";
import {UserService} from "../../http/service/userService";
import {removeToken} from "../../AsyncStorage/removeToken";
const Loader = ({navigation}) => {
    const dispatch=useDispatch()
    useEffect(()=>{

        getToken().then(({access,refresh})=>{
            if(access && refresh){
                console.log('access',access)
                AuthService.refreshToken(refresh).then((newTokens)=>{
                    const {access_token,refresh_token}=newTokens
                    if(access_token && refresh_token){
                        setToken(access_token,refresh_token)
                        dispatch(SET_ACCESS(access_token))
                        UserService.dataUser().then((data)=>{
                            navigation.navigate('Menu',data)
                        }).catch(()=>{
                            navigation.navigate('UserInfo')
                        })

                    }
                }).catch(err=>{
                    navigation.navigate('Home')
                })
            }else{
                navigation.navigate('Home')
            }
        })
    },[])

    return (
        <ImageBackground source={loading} style={styles.bg}>
            <ActivityIndicator size={'large'}/>
        </ImageBackground>
    );
};
const styles= StyleSheet.create({
    bg:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default Loader;
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Animated,
    BackHandler, Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/Ionicons";
import {UserService} from "../../http/service/userService";

const CreateRoadFrom = ({navigation,route}) => {
    const [city,setCity]=useState([])
    const [cityId,setCityId]=useState(null)

    const [input1,setInput1]=useState('')
    const [input1Focus,setInput1Focus]=useState(false)
    const [input1Tap,setInput1Tap]=useState(false)

    const [input2,setInput2]=useState('')
    const [input2Focus,setInput2Focus]=useState(false)
    const [input2Tap,setInput2Tap]=useState(false)

    const [from,setFrom]=useState(null)
    const [to,setTo]=useState(null)
    const {width}=useWindowDimensions()
    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    let getCity=()=>{
        if(!input1Tap){
            UserService.getCity(input1).then(data=>{
                setCity(data)
            })
        }

    }
    getCity=useCallback(debounce(getCity,200),[input1])

    function handleVariable(value,latitude,longitude,city_id) {
        Keyboard.dismiss()
        const geo={
            latitude:+latitude,
            longitude:+longitude,
            latitudeDelta: 0,
            longitudeDelta: 0.00400,
            location:value,
            pick_up:true,
            city_id
        }
       navigation.navigate('Map',{geo,step:'from'})

    }


    function handleMeGeo() {
        Geolocation.getCurrentPosition(info=>{
            const {latitude,longitude}=info.coords
            const geo={
                latitude,
                longitude,
                latitudeDelta: 0,
                longitudeDelta: 0.00400,
                location:'Me GEO',
                pick_up:true,
                city_id:10
            }
            console.log(geo)
            navigation.navigate('Map',{geo,step:'from'})
        })
    }

    return (

        <View>
            <Pressable style={styles.cancel}>
                <Icon name={'close-outline'} size={40} color={'blue'} solid/>
            </Pressable>
            <Animated.View style={[styles.form]}>
                <View style={[styles.formEl]}>
                    <Text style={styles.text}>From</Text>
                    <View style={[styles.inputWrapper]}>
                        <Icon name={'car-outline'} size={35} />
                        <TextInput style={[styles.input,]} value={input1} onFocus={()=>{setInput1Tap(false); setInput1Focus(true)}} onBlur={()=>setInput1Focus(false)} onChangeText={(e)=>setInput1(e)} onKeyPress={getCity} returnKeyType="done"  placeholder={'From...'}/>
                    </View>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.scrollCar} contentContainerStyle={styles.carBonus}>
                            {input1Focus&&
                                <Pressable  onPress={()=>{

                                    handleMeGeo()}}>
                                    <Text style={styles.carBonusText}>Мое местоположение</Text>
                                </Pressable>
                            }
                            {city.map(data=>
                                <Pressable key={data.city_id} onPress={()=>{handleVariable(data.city,data.latitude,data.longitude,data.city_id); setCityId(data.city_id)}}>
                                    <Text style={styles.carBonusText}>{data.city}</Text>
                                </Pressable>)
                            }
                        </ScrollView>
                    {input1Tap&&
                        <Pressable style={styles.btn1} onPressIn={()=>next() }>
                            <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>CONTINUE</Text>
                        </Pressable>
                    }
                </View>
                <View style={[styles.formEl]}>
                    <Text style={styles.text}>To</Text>
                    <View style={[styles.inputWrapper]}>
                        <Icon name={'car-outline'} size={35} />
                        <TextInput style={[styles.input,]} value={input2} onFocus={()=>{setInput1Tap(false); setInput1Focus(true)}} onBlur={()=>setInput2Focus(false)} onChangeText={(e)=>setInput2(e)} onKeyPress={getCity} returnKeyType="done"  placeholder={'From...'}/>
                    </View>
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.scrollCar} contentContainerStyle={styles.carBonus}>
                        {city.map(data=>
                            <Pressable key={data.city_id} onPress={()=>{handleVariable(data.city,data.latitude,data.longitude); setCityId(data.city_id)}}>
                                <Text style={styles.carBonusText}>{data.city}</Text>
                            </Pressable>)
                        }
                    </ScrollView>
                    {input2Tap&&
                        <Pressable style={styles.btn1} onPressIn={()=>next() }>
                            <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>CONTINUE</Text>
                        </Pressable>
                    }
                </View>

            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    scrollCar:{
        width:'85%',
        borderStyle:'solid',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#b0b0ab',
        maxHeight:150,
        paddingVertical:1
    },
    carBonusText:{
        fontSize:25,
        height:50,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:'#b0b0ab',
        textAlignVertical:'center'
    },
    carBonus:{
        backgroundColor:'white',
    },
    btn1:{
        marginTop:40,
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#00bbff',
        borderRadius:10,
        marginBottom:10
    },
    btnDate:{
        backgroundColor:'blue'
    },
    textDate:{
        fontSize:20,
        marginTop:30
    },
    padding20:{
        paddingHorizontal:10
    },
    textErr:{
        marginTop:10,
        color:'red'
    },
    formEl:{

        width:'100%',
        display:'flex',
        alignItems:'center',
    },
    form:{
        width:'100%',
        flexDirection:'row'
    },
    input:{
        flex:1,
        paddingLeft:10,
        fontWeight:'bold',
        fontSize:20,
        display:'flex',
        textAlignVertical:'center',
    },
    inputWrapper:{
        backgroundColor:'rgba(0,0,0,0.1)',
        marginTop:30,
        display:'flex',
        alignItems:'center',
        padding:5,
        flexDirection:'row',
        borderRadius:10,
        marginHorizontal:30,
        borderStyle:'solid',
        borderWidth:1
    },
    text:{
        marginTop:50,
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold',
        width:'100%'
    },
    modalView: {
        flex:1,
        backgroundColor: 'white',
    },
});
export default CreateRoadFrom;
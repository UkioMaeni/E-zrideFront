import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Animated,
    BackHandler, Dimensions, Keyboard, Modal,
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
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from "react-redux";
import {ADD_POINT} from "../../store/reducers/orderReducer";

const CreateRoadOptions = ({navigation,route}) => {
    console.log(route.params)
    const dispatch=useDispatch()
    const {from,to,waypoints}=useSelector(state=>state.order)
    const {carList}=useSelector(state=>state.user)
    const [modalVisible,setModalVisible]=useState(false)
    console.log(from)
    console.log(to)
    const [geo,setGeo]=useState({
        latitude:37.78825,
        longitude:-122.4324,
        latitudeDelta: 0,
        longitudeDelta: 2.9421,
    })


    const  region={
        latitude:+geo.latitude,
        longitude:+geo.longitude,
        latitudeDelta: +geo.latitudeDelta,
        longitudeDelta: +geo.longitudeDelta,
    }

    function handleAddPoint(value) {
        const geolocation={...geo,location:'New Point',city_id:11,pick_up:value}
        dispatch(ADD_POINT(geolocation))
    }
    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    let editGeo=(e)=>{
        setGeo(e)
    }
    editGeo=useCallback(debounce(editGeo,200),[])

    const createOrder=()=>{
       const id=carList[0].id
        let location=[]
        location.push(from)

        waypoints.forEach(el=>{
            location.push(el)
        })
        location.push(to)
        location=location.map((el,index)=>({...el,sort_id:index+1,}))
        console.log(location)
        UserService.createOrder(route.params.carId,route.params.price,route.params.date,location)
    }
    return (

        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text >Do you want to pick up passengers at this point?</Text>
                        <View style={{flexDirection:'row'}}>
                            <Pressable style={[styles.point,{width: '30%',marginHorizontal:30}]} onPress={()=>{setModalVisible(false);handleAddPoint(true)}}>
                                <Text style={styles.pointText}>Yes</Text>
                            </Pressable>
                            <Pressable style={[styles.point,{width: '30%',marginHorizontal:30}]} onPress={()=>{setModalVisible(false);handleAddPoint(false)}}>
                                <Text style={styles.pointText}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <MapView
                style={styles.map}
                region={region}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0,
                    longitudeDelta: 65.0421,
                }}
                onRegionChange={(e)=>editGeo(e)}
            >

                <MapViewDirections
                    strokeColor={'#ff0000'}
                    strokeWidth={3}
                    origin={{
                        latitude:+from.latitude,
                        longitude:+from.longitude
                    }}
                    destination={{
                        latitude:+to.latitude,
                        longitude:+to.longitude
                    }}
                    waypoints={waypoints}
                    apikey={'AIzaSyCOvPfxcb0qXGu9cxYC_vcrC58bZihq-nc'}
                />
                <Marker coordinate={
                    {
                        latitude:+from.latitude,
                        longitude:+from.longitude
                    }
                }/>
                <Marker coordinate={
                    {
                        latitude:+to.latitude,
                        longitude:+to.longitude
                    }
                }/>
                {waypoints.map(el=><Marker coordinate={el}/>)}
            </MapView>
            <View style={[styles.map,{position:'absolute',alignItems:'center',justifyContent:'center'}]}>
                <Icon name={'location'} size={40} color={'red'} style={styles.geoIcon}/>
            </View>
            <View style={styles.map}>
                <Pressable style={styles.point} onPress={()=>setModalVisible(true)}>
                    <Text style={styles.pointText}>Add point</Text>
                </Pressable>
                {route.params?(
                    <View>
                        <Text>Date : {route.params.date}</Text>
                        <Text>Car {route.params.car}</Text>
                        <Text>Number of seats : {route.params.number_of_seats}</Text>
                        <Text>Price : {route.params.price}</Text>
                        <Pressable style={styles.point} onPress={()=>navigation.navigate('OrderInfo')}>
                            <Text style={styles.pointText}>Edit info</Text>
                        </Pressable>
                        <Pressable style={styles.point} onPress={()=>createOrder()}>
                            <Text style={styles.pointText}>Create road</Text>
                        </Pressable>
                    </View>


                ):(
                    <Pressable style={styles.point} onPress={()=>navigation.navigate('OrderInfo')}>
                        <Text style={styles.pointText}>Add info</Text>
                    </Pressable>
                )}


            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pointText:{
        color:'white',
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center'
    },
    point:{
        padding:10,
        marginTop:40,
        width:'80%',
        backgroundColor:'blue',
        borderRadius:20,
        alignSelf:'center'
    },
    geoIcon:{

    },
    geo:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:40,
        right:40,
        backgroundColor:'blue',
        borderRadius:20
    },
    mapOver:{
        height:Dimensions.get('window').height,
        position:'absolute',
        width:'100%',
        alignItems:'center',
        justifyContent:"center"

    },
    text:{
        borderStyle:'solid',
        borderWidth:1,
        backgroundColor:'white',

        zIndex:1,
        height:20,
        width:50
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get('window').height/2,
    },
});
export default CreateRoadOptions;
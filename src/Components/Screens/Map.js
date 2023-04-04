import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Text, View, StyleSheet, TextInput, Pressable} from "react-native";
import MapView, {AnimatedRegion, MapMarker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/Ionicons";
import {Marker} from "react-native-svg";
import {useDispatch} from "react-redux";
import {SET_FROM, SET_TO} from "../../store/reducers/orderReducer";
const Map = ({navigation,route}) => {
    const {city_id,location}=route.params.geo
    const dispatch=useDispatch()
    const [geo,setGeo]=useState({
        latitude:37.78825,
        longitude:-122.4324,
        latitudeDelta: 0,
        longitudeDelta: 0.0421,
    })
    useEffect(()=>{
        setGeo(route.params.geo)
    },[route.params.geo])

    const  region={
            latitude:+geo.latitude,
            longitude:+geo.longitude,
            latitudeDelta: +geo.latitudeDelta,
            longitudeDelta: +geo.longitudeDelta,
    }
    function handlerGeo() {
        if(route.params.step==='from'){
            dispatch(SET_FROM(geo))
            navigation.navigate('CreateRoadTo')
        }
        if(route.params.step==='to'){
            console.log(geo)
            dispatch(SET_TO(geo))
            navigation.navigate('CreateRoadOptions')
        }

    }
    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    let editGeo=(e)=>{
        const geolocation={...e}
        geolocation.city_id=city_id
        geolocation.location=location
        console.log(geolocation)
        setGeo(()=>geolocation)
    }
    editGeo=useCallback(debounce(editGeo,200),[])
    return (
        <View>
            <MapView
                style={styles.map}
                region={region}
                onRegionChange={(e)=>editGeo(e)}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0,
                    longitudeDelta: 6.0421,
                }}
            >

            </MapView>

            <View style={styles.mapOver}>
                <Icon name={'location'} size={40} color={'red'} style={styles.geoIcon}/>
                <Pressable style={styles.geo} onPressIn={handlerGeo}>
                    <Icon name={'chevron-forward-outline'} size={40} color={'white'} />
                </Pressable>
            </View>
            <View>
                <Text>GEO:</Text>
                <Text>{geo.latitude}</Text>
                <Text>{geo.longitude}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
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
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get('window').height,
        flex: 1,
    },
});
export default Map;
import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedbackComponent,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Shadow } from 'react-native-shadow-2';
import {UserService} from "../../http/service/userService";
import {useDispatch, useSelector} from "react-redux";
import {SET_CAR} from "../../store/reducers/userReducer";

const EmptyCreate=()=>{
    return(
        <View>
            <Text style={styles.empty}>Список пуст</Text>
        </View>
    )
}
const Create = ({navigation}) => {
    const dispatch=useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const {carList}=useSelector(state=>state.user)


    if(!carList){
        return (
            <View style={styles.centeredView}>
                <Text style={styles.empty}>No auto!</Text>
                <Text style={styles.emptyAuto}>To create a trip, add your vehicle details.</Text>
                <Pressable style={styles.btn1} onPressIn={()=>navigation.navigate('AutoInfo')}>
                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}} >ADD</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View style={styles.centeredView}>

            <EmptyCreate/>
            <Pressable style={styles.add} onPress={()=>navigation.navigate('CreateRoadFrom')}>
                <Shadow style={[styles.shadow,{elevation:35}]} offset={[0,8]} distance={20} startColor={'#ebecef'} endColor={'#ffffff'} >
                    <Icon name={'add-outline'} style={styles.icon}  size={70} color={'#ffffff'}/>
                </Shadow>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    btn1:{
        marginTop:40,
        width:'80%',
        display:'flex',
        alignItems:'center',
        padding:10,
        backgroundColor:'#00bbff',
        borderRadius:20,
        marginBottom:10
    },
    emptyAuto:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:20,
        textAlign:'center'
    },
    empty:{
        marginTop:50,
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold'
    },
    input:{
        flex:1,
        paddingLeft:10,
        fontWeight:'bold',
        fontSize:15
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
    },
    text:{
        marginTop:50,
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold'
    },
    cancel:{
        position:"absolute",
        top:5,
        left:5
    },
    add:{
        position:'absolute',
        bottom:40,
        right:40,
    },
    shadow:{
        height:70,
        width:70,
        borderRadius:35,
        backgroundColor:'#4c9ce1',

    },
    icon:{
        lineHeight:70,
        paddingLeft:2
    },
    centeredView: {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    modalView: {
        flex:1,
        backgroundColor: 'white',
    },
});

export default Create;
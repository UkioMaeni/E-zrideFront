import React, {useState} from 'react';
import {Modal, Pressable, View, StyleSheet, Text, Alert, Image} from "react-native";
import {Shadow} from "react-native-shadow-2";
import Icon from "react-native-vector-icons/Ionicons";
import profileImg from '../../assets/img/profile.png'
import {useSelector} from "react-redux";
import {removeToken} from "../../AsyncStorage/removeToken";
const Profile = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {name,surname,date_of_birth,carList}=useSelector(state=>state.user)
    console.log('car',carList)

    function handleExit() {
        removeToken().then(()=>{
            navigation.navigate('Home')
        })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.profile}>
                <View style={styles.data}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <View>
                        <Text style={styles.surname}>{surname}</Text>
                    </View>
                    <View>
                        <Text style={styles.birth}>
                            {date_of_birth}
                        </Text>
                    </View>
                </View>
                <View>
                    <Image style={styles.img} source={profileImg}/>
                </View>
            </View>
            <View style={styles.edit}>
                <Text style={styles.editText}>Edit Person data</Text>
                <Icon name={'create-outline'} size={25}/>
            </View>
            <View style={styles.carWrapper}>
                <Pressable style={styles.carTitle} >
                    <Icon name={'add'} size={30} color={'blue'} style={styles.icon} />
                    <Text style={styles.carText}>Car List</Text>
                </Pressable>
                {carList?carList.map(el=><View key={el.id}><Text >{el.name+el.manufacturer+el.model}</Text></View>):null}
            </View>
            <Pressable style={styles.exit} onPressIn={handleExit}>
                <Text style={styles.exitText}>EXIT</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    exitText:{
        textAlign:'center',
        color:'red',
        textDecorationLine:'underline',
        fontSize:25,
    },
    exit:{
        width:'30%',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'red',
        alignSelf:'center',
        marginTop:20

    },
    icon:{
        height:30,
        width:30,
        lineHeight:30,
        borderStyle:"solid",
        borderRadius:15,
        borderWidth:3,
        borderColor:'blue'
    },
    carText:{
        marginLeft:10,
        fontSize:30,
        fontWeight:'bold',
        color:'blue'
    },
    carTitle:{
        alignItems:'center',

        flexDirection:'row'
    },
    carWrapper:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        paddingVertical:30,
        borderStyle:'solid'
    },
    editText:{
        fontSize:18,
        color:'#1270fc',
        marginRight:10
    },
    edit:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        borderBottomColor:'gray',
        borderBottomWidth:1,
        paddingVertical:30,
        borderStyle:'solid'
    },
    data:{
        flex:1,
        position:'relative'
    },
    img:{
        width:150,
        height:150,
        borderRadius:75,
        borderWidth:1,
        borderColor:'#626262'
    },
    wrapper:{
       flex:1,
        padding:'10%'
    },
    profile:{
       display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',

        },
    name:{
        fontWeight:'bold',
        color:'#111111',
        fontSize:35
    },
    surname:{
        fontWeight:'bold',
        color:'#111111',
        fontSize:35,
    },
    birth: {
        color:'#111111',
        fontSize:20,
        position:'absolute',
        bottom:-50,
    },
    modalView: {
        flex:1,
        backgroundColor: 'white',
    },
});

export default Profile;
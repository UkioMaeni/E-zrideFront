import React, {useEffect} from 'react';
import {
    Text,
    TouchableHighlight,
    TouchableHighlightComponent,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons'
import Search from "../Tabs/Search";
import Message from "../Tabs/Message";
import History from "../Tabs/History";
import Create from "../Tabs/Create";
import Profile from "../Tabs/Profile";
import {useDispatch} from "react-redux";
import {SET_CAR, SET_USER_DATA} from "../../store/reducers/userReducer";
import AutoInfo from "../Tabs/AutoInfo";
import {UserService} from "../../http/service/userService";

function HomeScreen() {

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
        </View>
    );
}

const Menu = ({navigation,route}) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        UserService.getDataAuto().then((data)=>{
            dispatch(SET_CAR(data))
        }).catch(()=>{})
    },[])

    console.log(route.params)
    useEffect(()=>{
        dispatch(SET_USER_DATA(route.params))
    })

    useEffect(()=>{

        console.log('nain')
        navigation.addListener('blur',()=>{
            console.log('main')
        })
    },[navigation])
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                initialRouteName:'Create',
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 0,
                    height: '8%',
                    display:'flex',
                    width:'100%',
                    minHeight:'8%'

                },
                /*tabBarButton:({children})=>{
                    return <View style={{width:'20%',}}>{children}</View>
                },*/
                tabBarLabel:({focused})=>{
                    let color
                    color=focused?'blue':'gray'
                    return <Text style={{color,fontSize:12,textAlign:'center'}}>{route.name}</Text>
                },
                tabBarIcon: ({focused,}) => {
                    let iconName, color
                    switch (route.name) {
                        case 'Search':
                            iconName = 'search-outline'
                            color = focused ? 'blue' : 'gray'
                        break
                        case 'Create':
                            iconName='add-circle-outline'
                            color = focused ? 'blue' : 'gray'
                        break
                        case 'History':
                            iconName='calendar-outline'
                            color = focused ? 'blue' : 'gray'
                        break
                        case 'Message':
                            iconName='chatbubbles-outline'
                            color = focused ? 'blue' : 'gray'
                        break
                        case 'Profile':
                            iconName='person-circle-outline'
                            color = focused ? 'blue' : 'gray'
                        break
                    }
                    return <Ionicons name={iconName} size={20} color={color}/>
                }
            })}>
            <Tab.Screen name={'Search'} component={Search}/>
            <Tab.Screen name={'Create'} component={Create}/>
            <Tab.Screen name={'History'} component={History}/>
            <Tab.Screen name={'Message'} component={Message}/>
            <Tab.Screen name={'Profile'} component={Profile}/>
        </Tab.Navigator>
    );
};


export default Menu;
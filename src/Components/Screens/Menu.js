import React from 'react';
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

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
        </View>
    );
}

const Menu = () => {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({

                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 10,
                    height: '8%',
                    display:'flex',
                    width:'100%',

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
            <Tab.Screen name={'Search'} component={HomeScreen}/>
            <Tab.Screen name={'Create'} component={HomeScreen}/>
            <Tab.Screen name={'History'} component={HomeScreen}/>
            <Tab.Screen name={'Message'} component={HomeScreen}/>
            <Tab.Screen name={'Profile'} component={HomeScreen}/>
        </Tab.Navigator>
    );
};


export default Menu;
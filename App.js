/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/Components/Screens/Home";
import Registartion from "./src/Components/Screens/Registartion";
import {Provider, useDispatch} from "react-redux";
import {store} from "./src/store/store";
import {SET_STEP} from "./src/store/reducers/authReducer";
import Menu from "./src/Components/Screens/Menu";


const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <Provider store={store}>
           <Layout/>
        </Provider>
    );
};
const Layout=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(SET_STEP('Home'))
    },[])
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Menu'}>
                <Stack.Screen  name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen  name="Registration" component={Registartion} options={{headerShown: false}}/>
                <Stack.Screen  name="Menu"  component={Menu} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;

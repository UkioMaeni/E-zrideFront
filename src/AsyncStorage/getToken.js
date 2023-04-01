import {AsyncStorage} from "react-native";

export async function getToken(){
   const access= await AsyncStorage.getItem('access')
   const refresh= await AsyncStorage.getItem('refresh')
    return {access,refresh}
}
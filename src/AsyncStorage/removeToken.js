import {AsyncStorage} from "react-native";

export async function removeToken(){
    await AsyncStorage.removeItem('access')
    await AsyncStorage.removeItem('refresh')
    return 'succes'
}
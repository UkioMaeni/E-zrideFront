import {AsyncStorage} from "react-native";

export async function setToken(access,refresh){
    await AsyncStorage.setItem(
        'access',
            access
    )
    await AsyncStorage.setItem(
        'refresh',
        refresh
    )
}
import {authApi} from "./index";

export class AuthService {

    static async registration(phone){
        try{
            const res=await authApi.post('/sign-in',{
                phone
            })
            console.log(res.data.data.otp)
            return res.data.data.otp
        }catch (e) {
            console.log(e)
            return Promise.reject(e)
        }

    }
    static async confirm(phone,code){
        try {

            const res=await authApi.post('/otp',{
                phone,code:+code
            })
            const {access_token:access,refresh_token:refresh}=res.data.data
           return {access,refresh}
        }catch (e) {
            return Promise.reject(e)
        }
    }
    static async refreshToken(token){
        try {
            const res=await authApi.post('/refresh-token',{
                token
            })
            const {access_token,refresh_token}=res.data.data
            return {access_token,refresh_token}
        }catch (e) {
            return Promise.reject(e)
        }
    }
}
import {userApi} from "./index";
import {getToken} from "../../AsyncStorage/getToken";

export class UserService{
    static async dataUser(){
        const tokens= await getToken()
        const access=tokens.access
        try {

            const  res = await userApi.get('/client/info',{
                headers:{
                    Authorization: 'Bearer '+access
                }
            })
            return res.data.data
        }catch (e) {
            return Promise.reject(e)
        }

    }
    static async setDataUser(name,surname,date_of_birth){
        try {
           const tokens= await getToken()
            const access=tokens.access
            console.log('acces:',access)
            const res = await userApi.post('client/info',{
                name,surname,date_of_birth
            }, {
                headers:{
                    Authorization:'Bearer '+access
                }
            })
            console.log(res.data)
        }catch (e) {

        }
    }
    static async getDataAuto(){
        try {
            const tokens= await getToken()
            const access=tokens.access
            const res = await userApi.get('/client/auto',{
                headers:{
                    Authorization:'Bearer '+access
                }
            })

            return res.data.data
        }catch (e) {
            return Promise.reject(e)
        }
    }
    static async getCarManufactures(name){
        try {
            console.log('name:',name)
            const res=await userApi.get('/car/manufacturer',{
                params:{
                    name
                }
            })
            return  res.data.data
        }catch (e) {

        }
    }
    static async getCarModel(manufacturer_id,name){
        const res= await userApi.get('/car/model',{
            params:{
                manufacturer_id,name
            }
        })
        return res.data.data
    }
    static async createCar(model_id,manufacturer_id,name,number_of_seats){
        try {
            const tokens= await getToken()
            const access=tokens.access
            const res = await userApi.post('/client/auto',{
                model_id,manufacturer_id,name,number_of_seats
            },{
                headers:{
                    Authorization:'Bearer '+access
                }
            })
            return 'succes'
        }catch (e) {

        }

    }
    static async getCity(name){
        if(!name) return []
        const res=await userApi.get('/city',{
            params:{
                name
            }
        })
        return res.data.data
    }
    static async createOrder(client_auto_id,price,departure_time,locations){
        const tokens= await getToken()
        const access=tokens.access
        console.log(client_auto_id)
        console.log(price)
        console.log(departure_time)
        console.log(locations)
        const res=await  userApi.post('order',{
            client_auto_id,price:+price,departure_time,locations
        },{
            headers:{
                Authorization:'Bearer '+access
            }
        })
        console.log(res.data)
    }
}
import axios, {interceptors} from "axios";

const BASE_URL='http://31.184.254.86:9099/api/v1'

export const authApi=axios.create({
    baseURL:BASE_URL,
    timeout:1000
})

authApi.interceptors.response.use(
    function (res){
        return res
        },
    function (error){
            const status=error.response.status
            if(status===400){
                const code=error.response.data.code
                if(code===201){
                    return Promise.reject('unauthorized')
                }
            }
            if (status===401){
                const code=error.response.data.code
                console.log(error.response.data)
                if(code===60){
                    return Promise.reject('unauthorized')
                }
            }
            return Promise.reject(error)
            }
    )


export const userApi=axios.create({
    baseURL:BASE_URL,
    timeout:1000
})
userApi.interceptors.request.use(function (req){
    console.log(JSON.stringify(req.data))
    return req
})
userApi.interceptors.response.use(
    function (res){
        return res
    },
    function (error){
        const status=error.response.status
        if(status===400){
            const code=error.response.data.code
            if(code===212) return Promise.reject('noInfo')
            if(code===209) return  Promise.reject('noAuto')
        }

        console.log(error.response.data)
        return Promise.reject('au')
    }
)


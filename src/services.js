import axios from 'axios';

//https://ranekapi.origamid.dev/json/api/

const instance = axios.create({baseURL:"http://127.0.0.1/ranekwp/wp-json/api"})

instance.interceptors.request.use(
    function(config){
        const token = window.localStorage.token;
        if(token){
            config.headers.Authorization = token
        }
        return config;
    },

    function (error){
        return Promise.reject(error);
    }
)

export const api = { 
    get(endpoint){
        return instance.get(endpoint)
    },
    post(endpoint, body){
        return instance.post(endpoint, body)
    },
    delete(endpoint){
        return instance.delete(endpoint)
    },
    put(endpoint, body){
        return instance.put(endpoint, body)
    },
    login(body){
        return instance.post('http://localhost/ranekwp/wp-json/jwt-auth/v1/token', body)
    },
    validateToken(){
        return instance.post('http://localhost/ranekwp/wp-json/jwt-auth/v1/token/validate')
    },
    refresh() {
        return instance.post('/refresh')
    }
}
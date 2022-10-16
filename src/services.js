import axios from 'axios';

const instance = axios.create({baseURL:"http://localhost:3000/"})

export const api = { 
    get(endpoint){
        return instance.get(endpoint)
    },
    post(endpoint, body){
        return instance.post(endpoint, body)
    }
}
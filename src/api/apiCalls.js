import axios from 'axios'

export const signup =(user)=>{
    return axios.post('https://60b0c06a1f26610017fff217.mockapi.io/api/users/user',user)
}

export const login =(user)=>{
    return axios.post('https://60b0c06a1f26610017fff217.mockapi.io/api/users/login',user)
}
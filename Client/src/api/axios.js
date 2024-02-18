//we'll be importing axios from this file now
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:9000';

export default axios.create({
    baseURL: BASE_URL
});

//runs in BACKGROUND
//for interceptors that allow us to work w JWT and re try api calls if token expired
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' : 'application/json' },
    withCredentials: true
});
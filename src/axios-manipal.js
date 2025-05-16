import axios from 'axios'; 
export const baseURL = 'https://nodemanipalcigna.iorta.in/secure/sd/user/';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
}

const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;
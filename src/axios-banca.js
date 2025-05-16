import axios from 'axios'; 
export const baseURL = 'https://pocbancanode.iorta.in/secure/user/bookAppointment_v2';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
    "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGU1ZDYwNTZiMThlODMwOWRhM2ZhNDkiLCJwcm94eXVzZXIiOmZhbHNlLCJpYXQiOjE2NDY2NDczODMsImV4cCI6MTY0NjY0OTE4M30.xkxseKcF3OUaFYFixnkeiCyp6NwLKH4wYTUQE1y03bY", 
                    "sid": "79ee1860f25339f211c2c697537456236620f190a6ef988a7d08d5853d7fe9d36dfde3d6ad1964",
                    "token": "6e84760fe46ed30c4e2ee7a56c75724db3f77159"
    
}

const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;
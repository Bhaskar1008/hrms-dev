import axios from 'axios'; 
export const baseURL = 'https://sdtatadevlmsv2.iorta.in/secure/user/';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
    'sid':'6def3c56892123bc1ba4aee31054651c543f99ffb8ca8dd6570be9ad135dfcef6dfbe9d3aa1b671c',
    'token':'b3fb5b17a2d122d8ef8c2bef9801b104ed58655f',
    'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTUzZjFlYzQ3MzVlZjdmOTQyOTI2ZTMiLCJpYXQiOjE2MzkxMzY3MjcsImV4cCI6MTYzOTEzODUyN30.7HyECiCYqwXS4ZLWs1sVNtYju5vSVX7kXhWjHAoxg7U'
}
const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;
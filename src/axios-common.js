import axios from 'axios'; 
export const baseURL = 'https://sdrestnode.iorta.in/secure/sd/';
// export const nodeURL = 'https://sdtatadevnodev2.iorta.in/auth/';
export const baseURLAgentMicroSite = 'https://salesdrivex.iorta.in/';
let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const instance = axios.create({
    baseURL: baseURL,
    baseURLAgentMicroSite:baseURLAgentMicroSite,
    headers: defaultHeaders
});

export default instance;
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }

//   return req;
// });

export const signIn = async(formData, router) => {
    API.post('/api/v1/user/login', formData)
    .then(async res =>{
        global.confirmToken = res.data.data.access_token;
        await window.sessionStorage.setItem("itoken", res.data.data.access_token);
        await window.sessionStorage.setItem("email", res.data.data.response.email);
        await window.sessionStorage.setItem("username", res.data.data.response.email);
        router.push("/dieases_detection")
    })
}

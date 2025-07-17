import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = (email, password) => API.post('/auth/login', { email, password });
export const registerUser = (data) => API.post('/auth/register', data);


// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export default API;
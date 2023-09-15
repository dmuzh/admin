import axios from "axios";

// import { REFRESH_TOKEN, TOKEN } from "../constants";

const axiosClient = axios.create({
  baseURL: 'https://test-node-cx2p.onrender.com/admin/',
  // baseURL: 'http://localhost:3300/admin',
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;





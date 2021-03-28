import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from "./constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;

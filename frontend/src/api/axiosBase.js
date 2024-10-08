import axios from "axios";
import { BASE_URL } from "./apiConstants";

const axiosBase = axios.create({
  baseURL: BASE_URL,
});

export default axiosBase;

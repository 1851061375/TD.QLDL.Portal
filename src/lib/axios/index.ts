import axios from "axios";
import { API_VERSION, HOST_PATH } from "../../data/constant";
import { ICredential } from "../../models";
import { StoreType } from "../redux/Store";
import { resetData as resetAuth} from "@/features/auth/redux/Slice";
import { resetData as resetUser} from "@/features/user/redux/Slice";
import { RefreshToken } from "@/features/auth/redux/Actions";


let store: StoreType

export const injectStore = (_store: StoreType)=> {
  store = _store
}


const axiosInstance = axios.create({
    baseURL: HOST_PATH,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
    },
})

export const getToken = () => {
  const auth = localStorage.getItem("persist:auth")
  const authKey = auth != null ? JSON.parse(auth) : null
  if(authKey) {
    return JSON.parse(authKey?.auth)?.data?.token
  }
  return null
}

axiosInstance.defaults.headers.common['Tenant'] = `root`;
axiosInstance.defaults.withCredentials = false

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.data?.token;
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      try {
        const credential = store.getState().auth.data
        if(credential){
          const response = await store.dispatch(RefreshToken({token: credential.token, refreshToken: credential.refreshToken})).unwrap()
          originalRequest.headers.Authorization = `Bearer ${response.token}`;
        }
        else {
          store.dispatch(resetAuth())
          store.dispatch(resetUser())
        }
       return axiosInstance(originalRequest);
      } catch (error) {
        //logout
        store.dispatch(resetAuth())
        store.dispatch(resetUser())
      }
      
      
      // store.dispatch(login({ user: response.data.user }));
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
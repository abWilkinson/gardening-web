import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { client } from "../service/BaseService";
import { useEffect } from "react";
import { InternalAxiosRequestConfig } from "axios";
export const UnauthorizedInterceptor = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    let interceptorId = -1;
    useEffect(() => {
      //for strict mode in dev renders twice
      if (interceptorId !== -1) {
        return;
      }
      interceptorId = client.interceptors.response.use(undefined, (error) => {
        const statusCode = error.response?.status
    
        // logging only errors that are not 401
        if (statusCode && statusCode === 401) {
          setToken(null);
          navigate("/login", { replace: true });
        } else {
          console.error(error)
        }
    
        return Promise.reject(error)
      });    

      client.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        } else {
          delete config.headers["Authorization"];
        }
        return config;
      });
    }, []);

    return (
      null
    );
  };
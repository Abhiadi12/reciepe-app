import React, { useEffect, useState } from "react";
import {
  authenticatedAxios,
  nonAuthenticatedAxios,
} from "../services/api.service";

const useAxiosLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let requestInterceptor;
    let responseInterceptor;

    const showLoader = () => {
      setLoading(true);
    };

    const hideLoader = () => {
      setLoading(false);
    };

    const setupInterceptors = () => {
      requestInterceptor = authenticatedAxios.interceptors.request.use(
        (config) => {
          showLoader();
          return config;
        }
      );

      responseInterceptor = authenticatedAxios.interceptors.response.use(
        (response) => {
          hideLoader();
          return response;
        },
        (error) => {
          hideLoader();
          return Promise.reject(error);
        }
      );
    };

    const removeInterceptors = () => {
      authenticatedAxios.interceptors.request.eject(requestInterceptor);
      authenticatedAxios.interceptors.response.eject(responseInterceptor);
    };

    setupInterceptors();

    return () => {
      removeInterceptors();
    };
  }, []);

  return loading;
};

export default useAxiosLoader;

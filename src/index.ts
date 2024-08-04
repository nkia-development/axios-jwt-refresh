import { AxiosInstance, AxiosResponse } from "axios";
import { RefreshJwtCall, Options, State } from "./types";
/**
  @param {AxiosInstance} axiosInstance - Axios HTTP client instance
  @param {RefreshJwtCall} refreshJwtCall - refresh token call which must return a Promise
  @param {AxiosAuthRefreshOptions} options - options for the interceptor @see defaultOptions
  @return {number} - interceptor id (in case you want to eject it manually)
*/
const axiosJwtRefresh = (
  axiosInstance: AxiosInstance,
  refreshJwtCall: RefreshJwtCall,
  option: Options,
) => {
  const state: State = {
    skippedAxiosInstances: [],
    refreshJwtCall: undefined,
    requestQueueInterceptorId: undefined,
  };

  return axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      // [TO DO] - Implement the logic to refresh the token
      return Promise.reject(error);
    },
  );
};

export default axiosJwtRefresh;

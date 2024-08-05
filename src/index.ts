import { AxiosInstance, AxiosResponse } from "axios";
import { RefreshJwtCall, AxiosJwtRefreshOption, State } from "./types";
import defaultOption from "./defaultOption";
import getMergedOption from "./getMergedOption";

/**
  @param {AxiosInstance} axiosInstance - Axios HTTP client instance
  @param {RefreshJwtCall} refreshJwtCall - refresh token call which must return a Promise
  @param {AxiosAuthRefreshOptions} options - options for the interceptor @see defaultOptions
  @return {number} - interceptor id (in case you want to eject it manually)
*/
const axiosJwtRefresh = (
  axiosInstance: AxiosInstance,
  refreshJwtCall: RefreshJwtCall,
  option: AxiosJwtRefreshOption,
) => {
  const state: State = {
    skippedAxiosInstances: [],
    refreshJwtCall: undefined,
    requestQueueInterceptorId: undefined,
  };

  return axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      const mergedOption = getMergedOption(defaultOption, option);
      // [TO DO] - Implement the logic to refresh the token
      return Promise.reject(error);
    },
  );
};

export default axiosJwtRefresh;

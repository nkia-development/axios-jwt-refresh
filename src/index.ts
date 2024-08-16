import { AxiosInstance, AxiosResponse } from "axios";
import { RefreshJwtCall, IAxiosJwtRefreshOption, IState } from "./types";
import defaultOption from "./defaultOption";
import getMergedOption from "./getMergedOption";
import shouldInterceptError from "./shouldInterceptError";
import createRefreshCall from "./createRefreshCall";

/**
  @param {AxiosInstance} axiosInstance - Axios HTTP client instance
  @param {RefreshJwtCall} refreshJwtCall - refresh token call which must return a Promise
  @param {AxiosAuthRefreshOptions} options - options for the interceptor @see defaultOptions
  @return {number} - interceptor id (in case you want to eject it manually)
*/
const axiosJwtRefresh = (
  axiosInstance: AxiosInstance,
  refreshJwtCall: RefreshJwtCall,
  option: IAxiosJwtRefreshOption,
) => {
  const state: IState = {
    skippedAxiosInstances: [],
    refreshJwtCall: undefined,
    requestQueueInterceptorId: undefined,
  };

  return axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      const mergedOption = getMergedOption(defaultOption, option);
      // [TO DO] - Implement the logic to refresh the token

      if (!shouldInterceptError(error, mergedOption, axiosInstance, state)) {
        // If the error is not a network error and the response status is not in the statusCodes array, we don't need to intercept this error
        return Promise.reject(error);
      }

      // If refresh call does not exist, create one
      const refreshCall = createRefreshCall(error, refreshJwtCall, state);

      return Promise.reject(error);
    },
  );
};

export default axiosJwtRefresh;

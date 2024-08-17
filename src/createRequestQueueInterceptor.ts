import axios, { AxiosInstance } from "axios";
import { IState, IAxiosJwtRefreshOption } from "./types";

/**
    Creates request queue interceptor if it does not exist and returns its id.
    @param {AxiosInstance} axiosInstance - Axios HTTP client instance
    @param {IState} state - state object
    @param {IAxiosJwtRefreshOption} options - options for the interceptor @see defaultOptions
    @return {number} - interceptor id (in case you want to eject it manually)
    @description - Creates request queue interceptor if it does not exist and returns its id.
 */
const createRequestQueueInterceptor = (
  axiosInstance: AxiosInstance,
  state: IState,
  options: IAxiosJwtRefreshOption,
) => {
  if (typeof state.requestQueueInterceptorId === "undefined") {
    state.requestQueueInterceptorId = axiosInstance.interceptors.request.use(
      request => {
        return state.refreshJwtCall
          .catch(() => {
            throw new axios.Cancel("Request call failed");
          })
          .then(() => request);
      },
    );
  }
  return state.requestQueueInterceptorId;
};

export default createRequestQueueInterceptor;

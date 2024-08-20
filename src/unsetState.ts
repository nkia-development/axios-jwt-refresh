import { AxiosInstance } from "axios";
import { IState } from "./types";

/**
    @param {AxiosInstance} axiosInstance - Axios HTTP client instance
    @param {AxiosAuthRefreshCache} state
    @return {void}
    @description - Ejects request queue interceptor and unset interceptor cached values.
 */
const unsetState = (axiosInstance: AxiosInstance, state: IState): void => {
  axiosInstance.interceptors.request.eject(state.requestQueueInterceptorId);
  state.requestQueueInterceptorId = undefined;
  state.refreshJwtCall = undefined;
};

export default unsetState;

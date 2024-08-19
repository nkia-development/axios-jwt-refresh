import { AxiosInstance, AxiosPromise } from "axios";

/**
    @param {any} error - Axios error object
    @param {AxiosInstance} axiosInstance - Axios HTTP client instance
    @return AxiosPromise - Resend failed axios request.
    @description - Resend failed axios request.
 */
const resendFailedRequest = (
  error: any,
  axiosInstance: AxiosInstance,
): AxiosPromise => {
  error.config.skipAuthRefresh = true;
  return axiosInstance(error.response.config);
};

export default resendFailedRequest;

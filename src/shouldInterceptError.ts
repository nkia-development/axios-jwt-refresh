import { AxiosInstance } from "axios";
import { IAxiosJwtRefreshOption, IState } from "./types";

/**
    Returns TRUE: when error.response.status is contained in options.statusCodes
    Returns FALSE: when error or error.response doesn't exist or options.statusCodes doesn't include response status
    @return {boolean}
    @description - This function is used to check if the error should be intercepted or not
 */
function shouldInterceptError(
  error: any,
  options: IAxiosJwtRefreshOption,
  instance: AxiosInstance,
  state: IState,
): boolean {
  if (!error) {
    return false;
  }

  if (error.config?.skipAuthRefresh) {
    // skipAuthRefresh is set to true, so we don't need to intercept this error
    return false;
  }

  const isNetworkError =
    options.interceptNetworkError &&
    !error.response &&
    error.request?.status === 0;

  const isErrorResponseMissing = !error.response;

  const shouldRefresh = options.shouldRefresh
    ? options.shouldRefresh(error)
    : options.statusCodes?.includes(parseInt(error.response?.status));

  // If the error is not a network error and the response status is not in the statusCodes array, we don't need to intercept this error
  const isErrorResponseMissingOrNotRefreshable =
    isErrorResponseMissing || !shouldRefresh;

  if (!isNetworkError && isErrorResponseMissingOrNotRefreshable) {
    // If the error is not a network error and the response status is not in the statusCodes array, we don't need to intercept this error
    return false;
  }

  // Copy config to response if there's a network error, so config can be modified and used in the retry
  if (!error.response) {
    error.response = {
      config: error.config,
    };
  }

  return (
    !options.pauseInstanceWhileRefreshing ||
    !state.skippedAxiosInstances.includes(instance)
  );
}

export default shouldInterceptError;

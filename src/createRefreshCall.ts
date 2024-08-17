import { IState } from "./types";

/**
    @param {any} error - error object
    @param {function} fn - refresh token call
    @return {Promise<any>} - refresh call
    @description - Creates refresh call if it does not exist or returns the existing one.
 */
const createRefreshCall = (
  error: any,
  refreshJwtCall: (error: any) => Promise<any>,
  state: IState,
): Promise<any> => {
  if (!state.refreshJwtCall) {
    // Create a new refresh call
    state.refreshJwtCall = refreshJwtCall(error);
    if (typeof state.refreshJwtCall.then !== "function") {
      console.warn(
        "axios-auth-refresh requires `refreshTokenCall` to return a promise.",
      );
      return Promise.reject();
    }
  }
  return state.refreshJwtCall;
};

export default createRefreshCall;

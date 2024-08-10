import { AxiosInstance } from "axios";
import shouldInterceptError from "./shouldInterceptError";
import { IAxiosJwtRefreshOption, IState } from "./types";

describe("shouldInterceptError", () => {
  let mockAxiosInstance: AxiosInstance;
  let options: IAxiosJwtRefreshOption;
  let state: IState;

  beforeEach(() => {
    mockAxiosInstance = {} as AxiosInstance;
    options = {
      statusCodes: [401, 403],
      interceptNetworkError: true,
      pauseInstanceWhileRefreshing: false,
    };
    state = {
      refreshJwtCall: undefined,
      skippedAxiosInstances: [],
      requestQueueInterceptorId: undefined,
    };
  });

  it("should return false if error is null", () => {
    const result = shouldInterceptError(
      null,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should return false if error.config.skipAuthRefresh is true", () => {
    const error = { config: { skipAuthRefresh: true } };
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should return false for a network error if interceptNetworkError is false", () => {
    const error = { request: { status: 0 } };
    options.interceptNetworkError = false;
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should return true for a network error if interceptNetworkError is true", () => {
    const error = { request: { status: 0 } };
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(true);
  });

  it("should return false if error response is missing and network error is not intercepted", () => {
    const error = {};
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should return true if error response status is in statusCodes", () => {
    const error = { response: { status: 401 } };
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(true);
  });

  it("should return false if error response status is not in statusCodes", () => {
    const error = { response: { status: 500 } };
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should return true if shouldRefresh function returns true", () => {
    const error = { response: { status: 500 } };
    options.shouldRefresh = jest.fn(() => true);
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(true);
  });

  it("should return false if instance is paused while refreshing", () => {
    const error = { response: { status: 401 } };
    options.pauseInstanceWhileRefreshing = true;
    state.skippedAxiosInstances.push(mockAxiosInstance);
    const result = shouldInterceptError(
      error,
      options,
      mockAxiosInstance,
      state,
    );
    expect(result).toBe(false);
  });

  it("should copy config to error.response if network error occurs", () => {
    type Error = {
      request: { status: number };
      config: { url: string };
      response?: any;
    };

    const error: Error = { request: { status: 0 }, config: { url: "/test" } };
    shouldInterceptError(error, options, mockAxiosInstance, state);
    expect(error.response).toEqual({ config: { url: "/test" } });
  });
});

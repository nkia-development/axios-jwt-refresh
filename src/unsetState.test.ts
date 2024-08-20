import axios, { AxiosInstance } from "axios";
import unsetState from "./unsetState";
import { IState } from "./types";

describe("unsetState", () => {
  let axiosInstance: AxiosInstance;
  let state: IState;

  beforeEach(() => {
    axiosInstance = axios.create();

    state = {
      skippedAxiosInstances: [],
      refreshJwtCall: Promise.resolve("newToken"),
      requestQueueInterceptorId: axiosInstance.interceptors.request.use(
        config => {
          return config;
        },
      ),
    };
  });

  it("should eject the request interceptor and reset state values", () => {
    expect(state.requestQueueInterceptorId).toBeDefined();
    expect(state.refreshJwtCall).toBeDefined();

    unsetState(axiosInstance, state);

    expect(state.requestQueueInterceptorId).toBeUndefined();
    expect(state.refreshJwtCall).toBeUndefined();
  });

  it("should handle calling unsetState with no interceptor set", () => {
    state.requestQueueInterceptorId = undefined;
    state.refreshJwtCall = undefined;

    unsetState(axiosInstance, state);

    expect(state.requestQueueInterceptorId).toBeUndefined();
    expect(state.refreshJwtCall).toBeUndefined();
  });

  it("should not throw an error if the interceptor ID is undefined", () => {
    state.requestQueueInterceptorId = undefined;

    expect(() => unsetState(axiosInstance, state)).not.toThrow();

    expect(state.requestQueueInterceptorId).toBeUndefined();
  });
});

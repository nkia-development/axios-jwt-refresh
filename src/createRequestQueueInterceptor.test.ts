import axios, { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import createRequestQueueInterceptor from "./createRequestQueueInterceptor";
import { IState, IAxiosJwtRefreshOption } from "./types";

describe("createRequestQueueInterceptor", () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;
  let state: IState;
  let options: IAxiosJwtRefreshOption;

  beforeEach(() => {
    axiosInstance = axios.create();
    mock = new AxiosMockAdapter(axiosInstance);

    state = {
      skippedAxiosInstances: [],
      refreshJwtCall: Promise.resolve("newToken"), // Mocked refresh call
      requestQueueInterceptorId: undefined,
    };

    options = {
      statusCodes: [401],
      interceptNetworkError: false,
      shouldRefresh: () => true,
      pauseInstanceWhileRefreshing: false,
    };
  });

  afterEach(() => {
    mock.reset();
    state.requestQueueInterceptorId = undefined; // Reset interceptor ID after each test
  });

  it("should create a new request queue interceptor and return its id", () => {
    const interceptorId = createRequestQueueInterceptor(
      axiosInstance,
      state,
      options,
    );

    expect(interceptorId).toBeDefined();
    expect(typeof interceptorId).toBe("number");
    expect(state.requestQueueInterceptorId).toEqual(interceptorId);
  });

  it("should not create a new interceptor if one already exists", () => {
    const firstInterceptorId = createRequestQueueInterceptor(
      axiosInstance,
      state,
      options,
    );
    const secondInterceptorId = createRequestQueueInterceptor(
      axiosInstance,
      state,
      options,
    );

    expect(secondInterceptorId).toEqual(firstInterceptorId);
    expect(state.requestQueueInterceptorId).toEqual(firstInterceptorId);
  });

  it("should catch error and cancel the request if refreshJwtCall fails", async () => {
    state.refreshJwtCall = Promise.reject(new Error("Refresh token failed"));

    createRequestQueueInterceptor(axiosInstance, state, options);

    await expect(axiosInstance.get("/test")).rejects.toThrow(
      "Request call failed",
    );
  });

  it("should allow the request to proceed if refreshJwtCall succeeds", async () => {
    const interceptorId = createRequestQueueInterceptor(
      axiosInstance,
      state,
      options,
    );

    mock.onGet("/test").reply(200, { data: "success" });

    const response = await axiosInstance.get("/test");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: "success" });
  });
});

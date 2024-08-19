import axios, { AxiosInstance, AxiosError } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import resendFailedRequest from "./resendFailedRequest"; // 해당 함수가 위치한 경로를 지정하세요

describe("resendFailedRequest", () => {
  let axiosInstance: AxiosInstance;
  let mock: AxiosMockAdapter;
  let error: any;

  beforeEach(() => {
    axiosInstance = axios.create();
    mock = new AxiosMockAdapter(axiosInstance);

    // Mock an error object
    error = {
      config: {
        url: "/test",
        method: "get",
        headers: {},
      },
      response: {
        config: {
          url: "/test",
          method: "get",
          headers: {},
        },
        status: 401,
        statusText: "Unauthorized",
        data: {},
      },
      isAxiosError: true,
      toJSON: () => ({}),
      name: "AxiosError",
      message: "Request failed",
      code: undefined,
    };
  });

  afterEach(() => {
    mock.restore();
  });

  it("should resend the failed request and set skipAuthRefresh to true", async () => {
    // Mock the original request
    mock.onGet("/test").reply(200, { data: "success" });

    // Call resendFailedRequest
    const response = await resendFailedRequest(error, axiosInstance);

    // Verify that the request was resent
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: "success" });

    // Verify that skipAuthRefresh was set to true
    expect(error.config.skipAuthRefresh).toBe(true);
  });

  it("should handle errors when resending the request", async () => {
    // Mock the original request to fail again
    mock.onGet("/test").reply(500, { error: "Internal Server Error" });

    // Call resendFailedRequest and expect it to fail
    await expect(resendFailedRequest(error, axiosInstance)).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});

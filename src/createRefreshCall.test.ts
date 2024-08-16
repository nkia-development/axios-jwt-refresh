import createRefreshCall from "./createRefreshCall";
import { IState, RefreshJwtCall } from "./types";
import { AxiosError } from "axios";

describe("createRefreshCall", () => {
  let mockState: IState;
  let mockError: AxiosError;
  let mockRefreshJwtCall: jest.Mock<Promise<any>>;

  beforeEach(() => {
    mockState = {
      skippedAxiosInstances: [],
      refreshJwtCall: undefined,
      requestQueueInterceptorId: undefined,
    };
    mockError = new Error("Mock error") as AxiosError;
    mockRefreshJwtCall = jest.fn(() => Promise.resolve("Mock token"));
  });

  it("should create a new refresh call if it does not exist", async () => {
    const result = await createRefreshCall(
      mockError,
      mockRefreshJwtCall,
      mockState,
    );

    expect(mockRefreshJwtCall).toHaveBeenCalledWith(mockError);
    expect(mockState.refreshJwtCall).toBeInstanceOf(Promise);
    expect(result).toBe("Mock token");
  });

  it("should return the existing refresh call if it already exists", async () => {
    const existingRefreshCall = Promise.resolve("Existing token");
    mockState.refreshJwtCall = existingRefreshCall;

    const result = await createRefreshCall(
      mockError,
      mockRefreshJwtCall,
      mockState,
    );

    expect(mockRefreshJwtCall).not.toHaveBeenCalled();
    expect(result).toBe("Existing token");
  });

  it("should warn if refreshJwtCall does not return a promise", async () => {
    console.warn = jest.fn();
    mockRefreshJwtCall.mockReturnValueOnce("Not a promise" as any);

    // We expect the createRefreshCall to return a rejected promise here
    await expect(
      createRefreshCall(mockError, mockRefreshJwtCall, mockState),
    ).rejects.toBeUndefined();

    // Ensure the warning was logged
    expect(console.warn).toHaveBeenCalledWith(
      "axios-auth-refresh requires `refreshTokenCall` to return a promise.",
    );
  });

  it("should reject if refreshJwtCall does not return a promise", async () => {
    mockRefreshJwtCall.mockReturnValue("Not a promise" as any);

    await expect(
      createRefreshCall(mockError, mockRefreshJwtCall, mockState),
    ).rejects.toBeUndefined();
  });
});

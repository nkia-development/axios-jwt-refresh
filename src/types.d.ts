import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type RefreshJwtCall = (error: any) => Promise<any>;

type ShouldRefresh = (error: AxiosError) => boolean;

export interface IState {
  skippedAxiosInstances: AxiosInstance[];
  refreshJwtCall: Promise<any> | undefined;
  requestQueueInterceptorId: number | undefined;
}

export interface IAxiosJwtRefreshOption {
  statusCodes?: number[];
  interceptNetworkError?: boolean;
  shouldRefresh?: function; // [TO DO] - Define the type of this function
  pauseInstanceWhileRefreshing?: boolean;
}

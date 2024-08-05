import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type RefreshJwtCall = (error: any) => Promise<any>;

type ShouldRefresh = (error: AxiosError) => boolean;

export interface State {
  skippedAxiosInstances: AxiosInstance[];
  refreshJwtCall: Promise<any> | undefined;
  requestQueueInterceptorId: number | undefined;
}

export interface AxiosJwtRefreshOption {
  statusCodes: number[];
  shouldRefresh: boolean;
}

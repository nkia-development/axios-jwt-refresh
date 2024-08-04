import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type RefreshJwtCall = (error: any) => Promise<any>;

type ShouldRefresh = (error: AxiosError) => boolean;

interface Options {
  statusCodes: Array<number>;
  shouldRefresh: ShouldRefresh;
  retryInstance?: AxiosInstance;
}

export interface State {
  skippedAxiosInstances: AxiosInstance[];
  refreshJwtCall: Promise<any> | undefined;
  requestQueueInterceptorId: number | undefined;
}

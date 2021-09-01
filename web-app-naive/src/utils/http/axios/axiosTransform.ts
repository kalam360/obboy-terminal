/**
 * Data processing classes can be configured according to projects
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';

export abstract class AxiosTransform {
  /**
   * @description: Processing configuration before requesting
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: Request successfully
   */
  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: Request failure
   */
  requestCatch?: (e: Error) => Promise<any>;

  /**
   * @description: Request the previous interceptor
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * @description: Interceptor after request
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: Request the previous interceptor error handling
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: Interceptor error handling after request
   */
  responseInterceptorsCatch?: (error: Error) => void;
}

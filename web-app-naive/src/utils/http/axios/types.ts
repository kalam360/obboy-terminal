import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface RequestOptions {
  // Request parameters spliced ​​to the URL
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to show prompt information
  isShowMessage?: boolean;
  // Whether parsing into JSON
  isParseToJson?: boolean;
  // Successful text information
  successMessageText?: string;
  // Whether to display successful information
  isShowSuccessMessage?: boolean;
  // Whether to display failed information
  isShowErrorMessage?: boolean;
  // Wrong text information
  errorMessageText?: string;
  // Whether to join the URL
  joinPrefix?: boolean;
  //Interface address, use default APIURL without filling
  apiUrl?: string;
  // Error message prompt type
  errorMessageMode?: 'none' | 'modal';
  //Do you add a timestamp?
  joinTime?: boolean;
  // Do not handle any processing, return directly
  isTransformResponse?: boolean;
  // Whether to return to the native response header
  isReturnNativeResponse?: boolean;
}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  message: string;
  result?: T;
}

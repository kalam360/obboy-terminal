// AXIOS configuration can be changed according to the project, just change the file, other files can not move
import { VAxios } from './Axios';
import { AxiosTransform } from './axiosTransform';
import axios, { AxiosResponse } from 'axios';
import { checkStatus } from './checkStatus';
import { joinTimestamp, formatRequestDate } from './helper';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';

import { useGlobSetting } from '@/hooks/setting';

import { isString } from '@/utils/is/';
import { setObjToUrlParams } from '@/utils/urlUtils';

import { RequestOptions, Result } from './types';

import { useUserStoreWidthOut } from '@/store/modules/user';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix || '';

import router from '@/router';
import { storage } from '@/utils/Storage';

/**
 * @description: Data processing, convenient to distinguish a variety of processing methods
 */
const transform: AxiosTransform = {
  /**
   * @description: Process request data
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    // @ts-ignore
    const { $message: Message, $dialog: Modal } = window;
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;

    // Whether to return native response heads such as: Use this property when you need to get your head
    if (isReturnNativeResponse) {
      return res;
    }
    // Do not handle any processing, return directly
    // Used for page code may need to get directly to Code, Data, Message this information is turned on
    if (!isTransformResponse) {
      return res.data;
    }

    const reject = Promise.reject;

    const { data } = res;

    if (!data) {
      // return '[HTTP] Request has no return value';
      return reject(data);
    }
    //  Here Code, Result, Message is a unified field in the background, and you need to modify the project to the project to return format in Types.ts.
    const { code, result, message } = data;
    // Request success
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    // Whether to show prompt information
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // Whether to display a custom information prompt?
        Message.success(successMessageText || message || '操作成功！');
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // Whether to display a custom information prompt?
        Message.error(message || errorMessageText || '操作失败！');
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // ErrorMessageMode = 'CUSTOM-MODAL' will display MODAL error pop-up, not a message prompt, used for some important errors
        Modal.info({
          title: '提示',
          content: message,
          positiveText: '确定',
          onPositiveClick: () => {},
        });
      }
    }

    // The interface request is successful, and the result is returned directly.
    if (code === ResultEnum.SUCCESS) {
      return result;
    }
    // Interface request error, unified prompt error message
    if (code === ResultEnum.ERROR) {
      if (message) {
        Message.error(data.message);
        Promise.reject(new Error(message));
      } else {
        const msg = 'The operation failed, the system is abnormal!';
        Message.error(msg);
        Promise.reject(new Error(msg));
      }
      return reject();
    }

    // Login timeout
    if (code === ResultEnum.TIMEOUT) {
      if (router.currentRoute.value.name == 'login') return;
      // Go to the login page
      const timeoutMsg = 'Log in timeout, please log in!';
      Modal.warning({
        title: 'hint',
        content: 'Login identity has been invalid, please log in again!',
        positiveText: 'Sure',
        negativeText: 'Cancel',
        onPositiveClick: () => {
          storage.clear();
          router.replace({
            name: 'login',
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        },
        onNegativeClick: () => {},
      });
      return reject(new Error(timeoutMsg));
    }

    // The logic here can be modified according to the project
    if (!hasSuccess) {
      return reject(new Error(message));
    }

    return data;
  },

  // Processing config before requesting
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // Add a timestamp parameter to the GET request to avoid data from the cache.
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // Compatible with RESTful style
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      } else {
        // Compatible with RESTful style
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: Request interceptor processing
   */
  requestInterceptors: (config) => {
    // Processing config before requesting
    const userStore = useUserStoreWidthOut();
    const token = userStore.getToken;
    if (token) {
      // jwt token
      config.headers.token = token;
    }
    return config;
  },

  /**
   * @description: Response error handling
   */
  responseInterceptorsCatch: (error: any) => {
    // @ts-ignore
    const { $message: Message, $dialog: Modal } = window;
    const { response, code, message } = error || {};
    // TODO To return format modifications based on the rear end interface
    const msg: string =
      response && response.data && response.data.message ? response.data.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Message.error('Interface request timeout, please refresh the page retry!');
        return;
      }
      if (err && err.includes('Network Error')) {
        Modal.info({
          title: 'network anomaly',
          content: 'Please check if your network connection is normal!',
          positiveText: 'Sure',
          onPositiveClick: () => {},
        });
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
    // Request to be canceled
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg, Message);
    } else {
      console.warn(error, 'Request is canceled!');
    }
    return error;
  },
};

const Axios = new VAxios({
  timeout: 10 * 1000,
  // Interface prefix
  prefixUrl: urlPrefix,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // Data processing method
  transform,
  // Configuration item, the following options can be overwritten in a separate interface request
  requestOptions: {
    // Add prefix to the URL by default
    joinPrefix: true,
    // Whether to return native response heads such as: Use this property when you need to get your head
    isReturnNativeResponse: false,
    // Need to process the return data
    isTransformResponse: true,
    // Adding a parameter to the URL when POST request
    joinParamsToUrl: false,
    // Format submission parameter time
    formatDate: true,
    // Message prompt type
    errorMessageMode: 'none',
    // interface address
    apiUrl: globSetting.apiUrl as string,
  },
  withCredentials: false,
});

export default Axios;

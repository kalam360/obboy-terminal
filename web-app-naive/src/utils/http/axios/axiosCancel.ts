import axios, { AxiosRequestConfig, Canceler } from 'axios';
import qs from 'qs';

import { isFunction } from '@/utils/is/index';

// Declare an Map for storing the identity and cancel function of each request
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          //If there is no current request in Pending, add it.
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: Empty all PENDING
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * Remove request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request ID in the pending, you need to cancel the current request and remove it.
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: Reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}

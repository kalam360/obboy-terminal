import http from '@/utils/http/axios';

/**
 * @description: Role list
 */
export function getRoleList(params) {
  return http.request({
    url: '/role/list',
    method: 'GET',
  });
}

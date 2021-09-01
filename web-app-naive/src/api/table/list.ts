import http from '@/utils/http/axios';

//Get TABLE
export function getTableList(params) {
  return http.request({
    url: '/table/list',
    method: 'get',
    params,
  });
}

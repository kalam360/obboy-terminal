import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name Name of routing, must be set, and cannot name repetition
 * @param meta RMB routing information (routing with extended information)
 * @param redirect Redirection address, access the routing, set the redirect
 * @param meta.disabled Disable the menu
 * @param meta.title The name of the menu
 * @param meta.icon The menu icon
 * @param meta.keepAlive Cache chain
 * @param meta.sort Sort the smaller top
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: 'The results page',
      icon: renderIcon(CheckCircleOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: 'Successful page',
        },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: 'Failure page',
        },
        component: () => import('@/views/result/fail.vue'),
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: 'Information page',
        },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
];

export default routes;

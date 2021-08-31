import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ExclamationCircleOutlined } from '@vicons/antd';
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
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      title: 'Abnormal page',
      icon: renderIcon(ExclamationCircleOutlined),
      sort: 3,
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '403',
        },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '404',
        },
        component: () => import('@/views/exception/404.vue'),
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '500',
        },
        component: () => import('@/views/exception/500.vue'),
      },
    ],
  },
];

export default routes;

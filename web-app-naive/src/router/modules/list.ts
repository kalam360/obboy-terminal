import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
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
    path: '/list',
    name: 'List',
    redirect: '/list/basic-list',
    component: Layout,
    meta: {
      title: 'List page',
      icon: renderIcon(TableOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'basic-list',
        name: 'basic-list',
        meta: {
          title: 'Based on the list',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'basic-info/:id?',
        name: 'basic-info',
        meta: {
          title: 'Basic details',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
    ],
  },
];

export default routes;

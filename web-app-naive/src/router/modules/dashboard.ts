import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'dashboard';

/**
 * @param name Name of routing, must be set, and cannot name repetition
 * @param meta RMB routing information (routing with extended information)
 * @param redirect Redirection address, access the routing, set the redirect
 * @param meta.disabled Disable the menu
 * @param meta.title The name of the menu
 * @param meta.icon The menu icon
 * @param meta.keepAlive Cache chain
 * @param meta.sort Sort the smaller top
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/console',
    component: Layout,
    meta: {
      title: 'Dashboard',
      icon: renderIcon(DashboardOutlined),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: 'Master station',
          permissions: ['dashboard_console'],
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
      // {
      //   path: 'monitor',
      //   name: `${ routeName }_monitor`,
      //   meta: {
      //     title: 'Monitor the page',
      //     permissions: ['dashboard_monitor']
      //   },
      //   component: () => import('@/views/dashboard/monitor/monitor.vue')
      // },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: 'The workbench',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/workplace/workplace.vue'),
      },
    ],
  },
];

export default routes;

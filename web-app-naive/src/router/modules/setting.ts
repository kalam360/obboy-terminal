import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SettingOutlined } from '@vicons/antd';
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
    path: '/setting',
    name: 'Setting',
    redirect: '/setting/account',
    component: Layout,
    meta: {
      title: 'Settings page',
      icon: renderIcon(SettingOutlined),
      sort: 5,
    },
    children: [
      {
        path: 'account',
        name: 'setting-account',
        meta: {
          title: 'Personal Settings',
        },
        component: () => import('@/views/setting/account/account.vue'),
      },
      {
        path: 'system',
        name: 'setting-system',
        meta: {
          title: 'System Settings',
        },
        component: () => import('@/views/setting/system/system.vue'),
      },
    ],
  },
];

export default routes;

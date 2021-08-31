import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon, renderNew } from '@/utils';

const routeName = 'comp';

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
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: 'Components in the sample',
      icon: renderIcon(WalletOutlined),
      sort: 8,
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        redirect: '/comp/table/basic',
        component: ParentLayout,
        meta: {
          title: 'form',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_table_basic`,
            meta: {
              title: 'Basic form',
            },
            component: () => import('@/views/comp/table/basic.vue'),
          },
          {
            path: 'editCell',
            name: `${routeName}_table_editCell`,
            meta: {
              title: 'The cell to edit',
            },
            component: () => import('@/views/comp/table/editCell.vue'),
          },
          {
            path: 'editRow',
            name: `${routeName}_table_editRow`,
            meta: {
              title: 'The whole line edit',
            },
            component: () => import('@/views/comp/table/editRow.vue'),
          },
        ],
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: 'The form',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_form_basic`,
            meta: {
              title: 'Based on using',
            },
            component: () => import('@/views/comp/form/basic.vue'),
          },
          {
            path: 'useForm',
            name: `useForm`,
            meta: {
              title: 'useForm',
            },
            component: () => import('@/views/comp/form/useForm.vue'),
          },
        ],
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: 'To upload pictures',
        },
        component: () => import('@/views/comp/upload/index.vue'),
      },
      {
        path: 'modal',
        name: `${routeName}_modal`,
        meta: {
          title: 'Pop-up extension',
        },
        component: () => import('@/views/comp/modal/index.vue'),
      },
      {
        path: 'richtext',
        name: `richtext`,
        meta: {
          title: 'The rich text',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/richtext/vue-quill.vue'),
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: 'Drag and drop',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/drag/index.vue'),
      },
    ],
  },
];

export default routes;

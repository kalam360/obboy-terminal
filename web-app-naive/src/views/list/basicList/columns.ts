import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: 'Avatar',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: 'address',
    key: 'address',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 150,
  },
  {
    title: 'start date',
    key: 'beginTime',
    width: 160,
  },
  {
    title: 'End date',
    key: 'endTime',
    width: 160,
  },
  {
    title: 'Create time',
    key: 'date',
    width: 100,
  },
];

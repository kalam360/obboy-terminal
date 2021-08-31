import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'coding',
    key: 'no',
    width: 100,
  },
  {
    title: 'The name of the',
    key: 'name',
    width: 100,
  },
  {
    title: 'Head portrait',
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
    width: 150,
  },
  {
    title: 'Start date',
    key: 'beginTime',
    width: 160,
  },
  {
    title: 'End date',
    key: 'endTime',
    width: 160,
  },
  {
    title: 'state',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? 'To enable the' : 'disable'),
        }
      );
    },
  },
  {
    title: 'Creation time',
    key: 'date',
    width: 160,
  },
  {
    title: 'Residence time',
    key: 'time',
    width: 80,
  },
];

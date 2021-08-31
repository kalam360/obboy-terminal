import { h } from 'vue';
import { NAvatar } from 'naive-ui';

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
    editComponent: 'NInput',
    // The default will fill in check
    editRule: true,
    edit: true,
    width: 200,
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
    editComponent: 'NSelect',
    editComponentProps: {
      options: [
        {
          label: 'Guangdong province,',
          value: 1,
        },
        {
          label: 'Zhejiang province',
          value: 2,
        },
      ],
    },
    edit: true,
    width: 200,
    ellipsis: false,
  },
  {
    title: 'Start date',
    key: 'beginTime',
    edit: true,
    width: 160,
    editComponent: 'NDatePicker',
    editComponentProps: {
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
    },
    ellipsis: false,
  },
  {
    title: 'End date',
    key: 'endTime',
    width: 160,
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

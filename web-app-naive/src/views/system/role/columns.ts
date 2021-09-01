import { h } from 'vue';
import { NTag } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'Role Name',
    key: 'name',
  },
  {
    title: 'illustrate',
    key: 'explain',
  },
  {
    title: 'Whether the default role',
    key: 'isDefault',
    render(row) {
      return h(
        NTag,
        {
          type: row.isDefault ? 'success' : 'error',
        },
        {
          default: () => (row.isDefault ? 'Yes' : 'no'),
        }
      );
    },
  },
  {
    title: 'Create time',
    key: 'create_date',
  },
];

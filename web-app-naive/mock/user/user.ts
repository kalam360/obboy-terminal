import Mock from 'mockjs';
import { resultSuccess } from '../_util';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  permissions: [
    {
      label: 'Main control station',
      value: 'dashboard_console',
    },
    {
      label: 'Monitor page',
      value: 'dashboard_monitor',
    },
    {
      label: 'Work bench',
      value: 'dashboard_workplace',
    },
    {
      label: 'Basic list',
      value: 'basic_list',
    },
    {
      label: 'Basic list delete',
      value: 'basic_list_delete',
    },
  ],
};

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token });
    },
  },
  {
    url: '/api/admin_info',
    timeout: 1000,
    method: 'get',
    response: () => {
      // const token = getRequestToken(request);
      // if (!token) return resultError('Invalid token');
      return resultSuccess(adminInfo);
    },
  },
];

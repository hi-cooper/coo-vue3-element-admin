/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IHttpApiResponse } from '@/api/HttpApi/types';
import type { IMockParam } from '../types';

const apis: IMockParam[] = [
  {
    url: '/v1/test/create',
    method: 'post',
    response: function (option?: Record<string, unknown>): IHttpApiResponse<any> {
      return {
        requestId: '1',
        code: 200,
        message: '成功',
        data: {
          userId: 1,
          username: 'Cooper',
        },
      };
    },
  },
];

export default apis;

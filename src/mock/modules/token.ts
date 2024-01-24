/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IHttpApiResponse } from '@/api/HttpApi/types';
import type { IMockParam } from '../types';
import type { TokenCreateRequest } from '@/api/HttpApi/modules/token/types';

const apis: IMockParam[] = [
  {
    url: '/v1/token/create',
    method: 'post',
    response: function (options: Record<string, unknown>): IHttpApiResponse<any> {
      const request = JSON.parse(options.body as string) as TokenCreateRequest;

      if (!request || !request.account || !request.password || request.account !== 'CooperAdmin' || request.password !== '123456') {
        return {
          requestId: '1',
          code: 400001,
          message: '用户名或密码错误',
        };
      }

      return {
        requestId: '1',
        code: 200,
        message: '成功',
        data: {
          access_token: '1234',
          token_type: 'bearer',
          refresh_token: '23456',
          expires_in: 2000,
          openid: 20000123,
        },
      };
    },
  },
];

export default apis;

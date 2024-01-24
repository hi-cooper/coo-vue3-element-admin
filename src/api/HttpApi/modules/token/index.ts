import HttpHelper from '@/api/HttpApi/HttpHelper';
import type { IHttpApiResponse } from '@/api/HttpApi/types';
import type { TokenCreateRequest, TokenCreateResponse } from './types';

const Api = {
  v1: {
    create: '/v1/token/create',
  },
};

const token = {
  create: function (params: TokenCreateRequest): Promise<IHttpApiResponse<TokenCreateResponse>> {
    return HttpHelper.postJson(Api.v1.create, params, false);
  },
};

export default token;

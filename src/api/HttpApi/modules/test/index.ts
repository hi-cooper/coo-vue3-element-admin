
import HttpHelper from '../../HttpHelper';
import type { IHttpApiResponse } from '../../types';
import type { TestCreateRequest, TestCreateResponse } from './types';

const Api = {
  v1: {
    create: '/v1/test/create',
  },
};

const test = {
  create: function (params: TestCreateRequest): Promise<IHttpApiResponse<TestCreateResponse>> {
    return HttpHelper.postJson(Api.v1.create, params, true);
  },
};

export default test;

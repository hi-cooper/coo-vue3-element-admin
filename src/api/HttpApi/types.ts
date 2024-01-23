export interface IHttpApiResponse<T> {
  /** 请求的唯一id */
  requestId: string;
  /** 响应编码， 200-成功；非200-业务异常码 */
  code: number;
  /** 提示信息 */
  message: string;
  /** 应答消息体 */
  data?: T;
}

export interface IHttpApiError<T> {
  /** 是否是业务异常 */
  isBizError: boolean;
  /** 错误详细数据 */
  data: any | IHttpApiResponse<T>;
}

import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RequestBodyDefault,
  RequestHeadersDefault,
  RequestParamsDefault,
  RequestQuerystringDefault,
  RouteShorthandOptions,
} from 'fastify';
import { RouteHandlerMethod } from 'fastify/types/route';
import { ReplyDefault } from 'fastify/types/utils';
import { FastifySchema } from 'fastify/types/schema';

export type DefaultQuery = RequestQuerystringDefault;
export type DefaultParams = RequestParamsDefault;
export type DefaultBody = RequestBodyDefault;
export type DefaultHeaders = RequestHeadersDefault;
export interface ApiController<
  Query = DefaultQuery,
  Params = DefaultParams,
  Body = DefaultBody,
  Headers = DefaultHeaders
> {
  method: string;
  url: string;
  // opts: RouteShorthandOptions;
  schema?: FastifySchema;
  handler: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    {
      Querystring: Query;
      Params: Params;
      Body: Body;
      Headers: Headers;
      Reply: ReplyDefault;
    }
  >;
}
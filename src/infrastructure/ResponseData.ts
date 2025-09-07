export enum ResponseType {
  success = 'success',
  error = 'error',
}

type Data = string | any[] | Record<string, any>;

export type ResponseData = {
  type: ResponseType;
  data?: Data;
};

export const ResponseFactory = new (class {
  createErrorResponse = (data: Data) => ({ type: ResponseType.error, data });
  createSuccessResponse = (data: Data) => ({ type: ResponseType.success, data });
})();

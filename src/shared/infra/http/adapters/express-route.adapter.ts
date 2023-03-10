import type { Request, Response } from 'express';

export class ExpressRouteAdapter {
  static adapt(controller: any) {
    return async (request: Request, response: Response) => {
      const { result, statusCode } = await controller.execute({
        params: request.params,
        payload: request.body,
        query: request.query,
        headers: request.headers
      });

      if (!result) {
        return response.status(statusCode).end();
      }

      response
        .status(statusCode)
        .json(statusCode > 299 ? { errors: result } : result);
    };
  }
}

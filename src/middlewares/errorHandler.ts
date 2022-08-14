import { Request, Response } from 'express';

import { CustomError } from '../errors/customError';

/* 
Error structure:
    errors: {
        message: string, field?: string
    }[]
*/

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  console.error(err);

  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};

import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }));
      res.status(400).json({ errors });
    }
    req.body = result.data;
    next();
  };
}

import { FastifyError, FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = Parameters<FastifyInstance['setErrorHandler']>[0];

export const globalErrorHandler: FastifyErrorHandler =
  function globalErrorHandlerFn(error: FastifyError, request, reply) {
    if (handleZodError(error, request, reply)) return;
    // // Send error response
    reply.status(500).send(error);
  };

function handleZodError(error, request, reply) {
  if (isZodError(error)) {
    const statusCode = 400;
    reply.status(statusCode).send({
      statusCode,
      message: 'Invalid or missing parameters provided',
      error: 'Bad Request',
      issues: error.issues,
    });
    return true;
  }
}

function isZodError(value: any): value is ZodError {
  return value.name === 'ZodError' && value.issues;
}

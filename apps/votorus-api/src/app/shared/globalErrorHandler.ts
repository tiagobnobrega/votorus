import { FastifyError, FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { env } from '@api/src/env/env';

type FastifyErrorHandler = Parameters<FastifyInstance['setErrorHandler']>[0];

function getStackTrace(error: Error) {
  if (env.ERR_STACK_TRACE) return error.stack.split('\n');
}

export const globalErrorHandler: FastifyErrorHandler =
  function globalErrorHandlerFn(error: FastifyError, request, reply) {
    if (handleZodError(error, request, reply)) return;
    // // Send error response
    error['stackTrace'] = getStackTrace(error);
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
      stackTrace: getStackTrace(error),
    });
    return true;
  }
}

function isZodError(value: any): value is ZodError {
  return value.name === 'ZodError' && value.issues;
}

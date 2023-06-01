import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@api/app/features/auth/firebase';
import z from 'zod';

const registerBody = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Email must be at least 6 characters long'),
  displayName: z.string().nonempty('A display name must be provided'),
});
export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/register',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { email, password, displayName } = registerBody.parse(request.body);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredentials.user);
      await updateProfile(userCredentials.user, { displayName });
      reply.status(201).send({ message: 'success' });
    }
  );

  fastify.get(
    '/confirmation',
    async function (request: FastifyRequest, reply: FastifyReply) {
      //send email confirmation for some user:
      throw new Error('Not implemented');
    }
  );

  fastify.get(
    '/login',
    async function (request: FastifyRequest, reply: FastifyReply) {
      //log user in
      // set auth token cookie
      throw new Error('Not implemented');
    }
  );
}

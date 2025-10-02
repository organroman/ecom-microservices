import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = getAuth(request);

  if (!userId) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
  request.userId = userId;
};

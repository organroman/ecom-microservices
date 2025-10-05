import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { CustomJwtSessionClaims } from "@repo/types";
declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = getAuth(request);
  console.log("🚀 ~ userId:", userId);

  if (!userId) {
    return reply.status(401).send({ error: "Not logged in" });
  }
  request.userId = userId;
};

export const shouldBeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const auth = getAuth(request);

  if (!auth.userId) {
    return reply.status(401).send({ error: "Not logged in" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "Unauthorized" });
  }
  request.userId = auth.userId;
};

import { clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify";
import { shouldBeUser } from "./middleware/authMiddleware";
import { connectOrderDb } from "@repo/order-db";
import { orderRoute } from "./routes/order";

const fastify = Fastify({ logger: true });
fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.status(200).send({
    message: "Order Service Authorized",
    userId: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDb();
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port:8001");
  } catch (error) {
    console.log(error);
    fastify.log.error(error);
  }
};

start();

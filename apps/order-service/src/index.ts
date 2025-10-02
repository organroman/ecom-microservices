import Fastify from "fastify";

const fastify = Fastify();

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port:8001");
  } catch (error) {
    fastify.log.error(error);
  }
};

start();

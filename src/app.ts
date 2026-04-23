
import dotenv from "dotenv"
dotenv.config()

import fastify from "fastify";
import userRoutes from "./routes/user.route";

const app = fastify({
    logger: true
});

app.get("/", async (request, reply) => {
    return { message: "server is running" }
});

app.register(userRoutes)

export default app;
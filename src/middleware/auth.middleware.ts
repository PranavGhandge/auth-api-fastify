import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
    request: any,
    reply: FastifyReply
) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({
                error: "No token Provided"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        request.user = decoded;
    }

    catch (err: any) {
        console.log("JWT ERROR:", err.message);

        return reply.status(401).send({
            error: err.message
        });
    }
}
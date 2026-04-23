import { FastifyReply } from "fastify";

export const roleMiddleware = (roles: string[]) => {
    return async (request: any, reply: FastifyReply) => {
        const user = request.user

        if (!user || !roles.includes(user.role)) {
            return reply.status(403).send({
                error: "Access denied"
            });
        };
    };
};
import { FastifyRequest, FastifyReply } from "fastify";
import { getUserService, createUserService, loginUserService, forgotPasswordService, resetPasswordService, refreshTokenService, } from "../services/user.service";

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await getUserService();

    return reply.send({
        data: user
    })
};

export const createUser = async (request: any, reply: FastifyReply) => {
    const create = await createUserService(request.body)

    return reply.send(create);
}

export const loginUser = async (req: any, reply: any) => {
    try {
        const result = await loginUserService(req.body)
        return reply.send(result)
    }
    catch (err: any) {
        return reply.status(400).send({
            error: err.message
        })
    }
}

export const forgotPassword = async (req: any, reply: any) => {
    try {
        const { email } = req.body

        const result = await forgotPasswordService(email)

        return reply.send(result);

    }

    catch (err: any) {
        return reply.status(400).send({ error: err.message })
    }
}

export const resetPassword = async (req: any, rep: any) => {
    try {
        const result = await resetPasswordService(req.body);
        return rep.send(result);
    }
    catch (err: any) {
        return rep.status(400).send({
            error: err.message
        });
    }
};

export const refreshToken = async (req: any, rep: any) => {
    try {
        const { token } = req.body;

        const result = await refreshTokenService(token)

        return rep.send(result)
    }

    catch (err: any) {
        return rep.status(400).send({
            err: err.message
        })
    }
}

import { FastifyInstance } from "fastify";
import { createUser, forgotPassword, getUser, loginUser, refreshToken, resetPassword } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";


export default async function userRoutes(app: FastifyInstance) {
    app.post("/user", createUser);
    app.post("/login", loginUser);
    app.get("/user", { preHandler: authMiddleware }, getUser);
    app.post("/forgot-password", forgotPassword);
    app.post("/reset-password", resetPassword);
    app.post("/refresh-token", refreshToken);
    app.get("/admin", { preHandler: [authMiddleware, roleMiddleware(["admin"])] },
        async (req, reply) => {
            return { message: "Welcome Admin" };
        }
    );
}
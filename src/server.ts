import app from "./app";

const start = async () => {
    try {
        await app.listen({ port: Number(process.env.PORT) || 3000 });
        console.log("server is running on port 3000")
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
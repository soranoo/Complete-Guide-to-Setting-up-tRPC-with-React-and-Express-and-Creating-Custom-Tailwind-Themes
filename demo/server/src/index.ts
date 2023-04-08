import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, t } from "./utils/trpc";
import routers from "./routes";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // enable CORS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appRouter = t.router({
    api: routers.api,
});

export type AppRouter = typeof appRouter;

app.use(
    "/",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

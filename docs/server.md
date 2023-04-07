🔙 [Back to the main page](../README.md)

## 📚 Table of Contents

- [🛠️ Step 1 - Setup Typescript](#🛠️-step-1---setup-typescript)
- [🛠️ Step 2 - Setup Nodemon](#🛠️-step-2---setup-nodemon)
- [🛠️ Step 3 - Setup Express](#🛠️-step-3---setup-express)
- [🛠️ Step 4 - Setup tRPC](#🛠️-step-4---setup-trpc)
- [📒 References](#📒-references)

## 🛠️ Step 1 - Setup Typescript

1. Create a new folder named `server` in the root of the project.
2. Open a terminal and navigate to the `server` folder.
3. Run the following commands:

    - Initialize a new npm project:

        ```bash
        npm init -y
        ```

    - Install Typescript and Node.js types:

        ```bash
        npm install -D typescript @types/node
        ```

    - Initialize Typescript configuration:

        ```bash
        npx tsc --init --rootDir ./src --outDir ./dist --esModuleInterop --resolveJsonModule --target esnext --lib esnext --module commonjs --allowJs true --removeComments true
        ```

4. Create a new folder named `src` in the root of the project.
5. Create a new file named `index.ts` in the `src` folder.

    Now your folder structure should similar to the following:
        
    ```bash
    .
    ├── node_modules
    ├── src                 # New folder
    │   └── index.ts        # New file
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
    ```

## 🛠️ Step 2 - Setup Nodemon

1. Install `ts-node` and `nodemon`:

    ```bash
    npm install --save-dev ts-node nodemon
    ```

2. Create a new file named `nodemon.json` in the root of the project and add the following content:

    ```json
    {
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
    }
    ```

    Now your folder structure should similar to the following:
        
    ```bash
    .
    ├── node_modules
    ├── src
    │   └── index.ts
    ├── nodemon.json        # New file
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
    ```

3. Add the following content to the `package.json` file:


    ```json
    "scripts": {
        "build": "rimraf ./dist && tsc",
        "start": "npm run build && node build/index.js",
        "dev": "nodemon server",
    },
    ```

## 🛠️ Step 3 - Setup Express

1. Install Express, Dotenv, and CORS:

    ```bash
    npm install express dotenv cors
    ```

2. Install Express, Node.js, and CORS types:

    ```bash
    npm i -D @types/express @types/node @types/cors
    ```

3. Add the following content to the `index.ts` file:

    ```ts
    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";

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

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
    ```

## 🛠️ Step 4 - Setup tRPC

1. Install tRPC and Zod:

    ```bash
    npm install @trpc/server zod
    ```

2. Create a new folder named `utils` in the `src` folder and add a new file named `trpc.ts` in it. Add the following content:

    ```ts
    import { initTRPC, inferAsyncReturnType } from "@trpc/server";
    import * as trpcExpress from "@trpc/server/adapters/express";

    export const createContext = ({
        req, res,
    }: trpcExpress.CreateExpressContextOptions) => ({});

    export type Context = inferAsyncReturnType<typeof createContext>;
    export const t = initTRPC.context<Context>().create();
    export const publicProcedure = t.procedure;
    ```

    Now your folder structure should similar to the following:

    ```bash
    .
    ├── node_modules
    ├── src
    │   ├── index.ts
    │   └── utils           # New folder
    │       └── trpc.ts     # New file
    ├── nodemon.json
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
    ```

3. Create a new folder named `routes` in the `src` folder and add a new file named `api.router.ts` in it.

    Now your folder structure should similar to the following:

    ```bash
    .
    ├── node_modules
    ├── src
    │   ├── index.ts
    │   ├── routes              # New folder
    │   │   └── api.router.ts   # New file
    │   └── utils
    │       └── trpc.ts
    ├── nodemon.json
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
    ```


4. Add the following content to the `api.router.ts` file:

    ```ts
    import { z } from "zod";
    import { t, publicProcedure } from "../utils/trpc";

    const helloWorldSchema = z.object({
        msg: z.string(),
    });

    const router = t.router({
        // demo route
        helloWorld: publicProcedure.input(helloWorldSchema).query(async ({ input }) => {
            return {
                msg: `Hello World! ${input.msg}`,
            };
        }),
    });

    export default router;
    ```


5. Add the following content to the `index.ts`(src/router/index.ts) file:

    ```ts
    import api from "./api.router";

    export default {
        api,
    }
    ```


6. Add the following content to the `index.ts`(src/index.ts) file:

    ```ts
    //...
    import * as trpcExpress from "@trpc/server/adapters/express";
    import { createContext, t } from "./utils/trpc";
    import routers from "./routes";

    //...

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

    //app.listen(port...
    ```

## 📒 References

### TypeScript & Nodemon
- https://khalilstemmler.com/blogs/typescript/node-starter-project/

### Express
- https://blog.logrocket.com/how-to-set-up-node-typescript-express/

##
🔙 [Back to the main page](../README.md)

🔜 [Client Side Guide](../client/README.md)

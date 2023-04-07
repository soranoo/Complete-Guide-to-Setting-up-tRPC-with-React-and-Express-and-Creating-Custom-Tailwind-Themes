🔙 [Back to the main page](../README.md)

## 📚 Table of Contents

- [🛠️ Step 1 - Create a new Vite project](#🛠️-step-1---create-a-new-vite-project)
- [🛠️ Step 2 - Setup tRPC](#🛠️-step-2---setup-trpc)
  - [Create a tRPC router](#create-a-trpc-router)
  - [Create a tRPC provider](#create-a-trpc-provider)
  - [Test your tRPC setup (optional)](#test-your-trpc-setup-optional)
- [🛠️ Step 3 - Setup Tailwind CSS](#🛠️-step-3---setup-tailwind-css)
  - [Create a Tailwind CSS configuration file](#create-a-tailwind-css-configuration-file)
- [🛠️ Step 4 - Setup Tailwind CSS theme](#🛠️-step-4---setup-tailwind-css-theme)
  - [Update Tailwind config file](#update-tailwind-config-file)
  - [Import the theme file](#import-the-theme-file)
  - [How to use the theme?](#how-to-use-the-theme)
- [🛠️ Minify HTML (Optional)](#🛠️-minify-html-optional)
- [🛠️ Alias (Optional)](#🛠️-alias-optional)
  - [How to use alias?](#how-to-use-alias)
- [📒 References](#📒-references)

## 🛠️ Step 1 - Create a new Vite project

1. Create a new Vite project with the following command:

    ```bash
    npm init @vitejs/app
    ```

    > ⚠️ You should run the command in the root folder of your project.

    > 📖 Note: NPM should be installed on your machine.

2. Choose the following options:

    ```bash
    ? Project name: client
    ? Select a framework: react
    ? Select a variant: TypeScript / TypeScript + SWC
    ```

3. Go to the `client` folder with the following command:

    ```bash
    cd client
    ```

## 🛠️ Step 2 - Setup tRPC

1. Run the following command to install tRPC related packages:

    ```bash
    npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query
    ```

### Create a tRPC router

2. Create a new folder called `global` in the `src` folder.
3. Create a new folder called `utils` inside the `global` folder.
4. Create a new file called `trpc.ts` inside the `utils` folder.

    Now your folder structure should similar to the following:
      
    ```bash
    .
    ├── node_modules
    ├── public
    ├── src
    │   ├── global              # New folder
    │   │   └── utils           # New folder
    │   │       └── trpc.ts     # New file
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
    ```

4. Add the following code to the `trpc.ts` file:

    ```ts
    import { createTRPCReact } from "@trpc/react-query";
    import type { AppRouter } from "../../../../server/src" //? By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client.

    export const trpc = createTRPCReact<AppRouter>();
    ```

    > 📖 Note: The `AppRouter` type is defined in the `server` folder.

### Create a tRPC provider

5. Replace the code in the `main.tsx` file with the following code:

    ```tsx
    import React from "react"
    import ReactDOM from "react-dom/client"

    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { httpBatchLink } from "@trpc/client";
    import { trpc } from "./global/utils/trpc";

    import App from "./App";
    import "./index.css";

    const trpcUrl = "http://127.0.0.1:5000";
    const queryClient = new QueryClient();
    const trpcClient = trpc.createClient({
      links: [
        httpBatchLink({
          url: trpcUrl,
        }),
      ],
    });

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <>
        <React.StrictMode>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </trpc.Provider>
        </React.StrictMode>
      </>
    );
    ```

### Test your tRPC setup (optional)

6. Replace the code in the `App.tsx` file with the following code:

    ```tsx
    import { useEffect, useState } from "react"
    import { trpc } from "./global/utils/trpc";

    const App = () => {
      const useQuery = trpc.api.helloWorld.useQuery({ msg: "It works!" });
      const [data, setData] = useState<string>("Loading...")

      useEffect(() => {
        if (useQuery.data)
          setData(useQuery.data.msg);
      }, [useQuery.data])

      return (
        <div>
          <h1>{data}</h1>
        </div>
      )
    }

    export default App
    ```

    > 📖 Note: Don't forget to start the server before testing your tRPC setup.

7. Go `http://127.0.0.1:5173` and you should see the following message:

    ```
    Hello World! It works!
    ```

## 🛠️ Step 3 - Setup Tailwind CSS

1. Install Tailwind CSS related dependencies with the following command:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

### Create a Tailwind CSS configuration file

2. Run the following command to create a Tailwind CSS and PostCSS configuration file:

    ```bash
    npx tailwindcss init -p
    ```

3. Replace the code in the `tailwind.config.js` file with the following code:

    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
      mode: "jit",
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

4. Add the following code to the `index.css` file:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

The Tailwind CSS configuration file is now ready.

## 🛠️ Step 4 - Setup Tailwind CSS theme

1. Install SASS with the following command:

    ```bash
    npm install sass
    ```

2. Create a new folder called `css` in the `global`(src/global) folder.
3. create a new file called `theme.scss` inside the `css` folder.

    Now your folder structure should similar to the following:
      
      ```bash
      .
      ├── node_modules
      ├── public
      ├── src
      │   ├── global
      │   │   ├── css             # New folder
      │   │   │   └── theme.scss  # New file
      │   │   └── utils
      │   │       └── trpc.ts
      │   ├── App.css
      │   ├── App.tsx
      │   ├── index.css
      │   ├── main.tsx
      │   └── vite-env.d.ts
      ├── index.html
      ├── package-lock.json
      ├── package.json
      ├── postcss.config.js
      ├── tailwind.config.js
      ├── tsconfig.json
      ├── tsconfig.node.json
      └── vite.config.ts
      ```

5. Add the following code to the `theme.scss` file:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    $default-theme: light;

    $theme: (
        light: (
            // button
            button-accent: #007aff
            button-accent-hover: #e5f1ff
            button-muted: #adb5bd

            // text
            text-color-base: #000000
            text-color-muted: #6c757d
            text-color-inverted: #ffffff

            // background
            bg-color-fill: #f8f9fa
        ),
        dark: (
            // button
            button-accent: #ffffff,
            button-accent-hover: #eef2ff,
            button-muted: #6366f1,

            // text
            text-color-base: #ffffff,
            text-color-muted: #c7d2fe,
            text-color-inverted: #4f46e5,

            // background
            bg-color-fill: #121212,
        ),
        // more themes...
    );

    @function hex-to-rgb($hex) {
        $r: red($hex);
        $g: green($hex);
        $b: blue($hex);
        @return $r, $g, $b;
    }


    @each $key,
    $value in map-get($theme, $default-theme) {
        :root {
            --#{$key}: #{hex-to-rgb($value)};
        }
    }

    @layer base {
        .theme-light {
            @each $key,
            $value in map-get($theme, light) {
                --#{$key}: #{hex-to-rgb($value)};
            }
        }

        .theme-dark {
            @each $key,
            $value in map-get($theme, dark) {
                --#{$key}: #{hex-to-rgb($value)};
            }
        }

        // more themes...
    }
    ```

### Update Tailwind config file

5. Replace the code in the `tailwind.config.js` file with the following code:

    ```js
    function withOpacity(variableName) {
      return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
          return `rgba(var(${variableName}), ${opacityValue})`
        }
        return `rgb(var(${variableName}))`
      }
    }

    /** @type {import('tailwindcss').Config} */
    export default {
      mode: "jit",
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          textColor: {
            skin: {
              base: withOpacity("--text-color-base"),
              muted: withOpacity("--text-color-muted"),
              inverted: withOpacity("--text-color-inverted"),
            },
          },
          backgroundColor: {
            skin: {
              fill: withOpacity("--bg-color-fill"),
              "button-accent": withOpacity("--bg-color-button-accent"),
              "button-accent-hover": withOpacity("--bg-color-button-accent-hover"),
              "button-muted": withOpacity("--bg-color-button-muted"),
            },
          },
          gradientColorStops: {
            skin: {
              hue: withOpacity("--gradient-color-stops-hue"),
            },
          },
        },
      },
      plugins: [],
    }
    ```

### Import the theme file

6. Add the following code to the `main.tsx` file:

    ```tsx
    import "./global/css/theme.scss";
    ```

### How to use the theme?

For example: apply skin color to the text:

```tsx
<p className="text-skin-base">Hello World!</p>
```

Apply the theme
  
```tsx
<div className="theme-dark">
  <p className="text-skin-base">Hello World!</p>
</div>
```

> 📖 Watch [Theming Tailwind with CSS Variables](https://youtu.be/MAtaT8BZEAo) to learn more about theming Tailwind CSS.

## 🛠️ Minify HTML (Optional)

1. Install the `vite-plugin-minify` plugin with the following command:

    ```bash
    npm install vite-plugin-minify -D
    ```

2. Add the following code to the `vite.config.ts` file:

    ```ts
    //...
    import { ViteMinifyPlugin } from 'vite-plugin-minify'

    //...
    export default defineConfig({
      //...
      plugins: [
        //...
        ViteMinifyPlugin({}),
      ],
      //...
    })
    ```

## 🛠️ Alias (Optional)

1. Add the following code to the `vite.config.ts` file:

    ```ts
    //...
    import path from 'node:path'

    //...
    export default defineConfig({
      //...
      resolve: {
        alias: {
          '@src': path.resolve(__dirname, 'src'),
        },
      },
      //...
    })
    ```

### How to use alias?

```tsx
// from
import { Button } from "./src/components/Button"

// to
import { Button } from "@src/components/Button"
```

## 📒 References

### tRPC
- https://trpc.io/docs/quickstart
- https://trpc.io/docs/reactjs/setup

### Tailwind CSS
- https://tailwindcss.com/docs/installation
- [How to Setup React and Tailwind CSS with Vite in a Project](https://www.freecodecamp.org/news/how-to-install-tailwindcss-in-react/)


##
🔙 [Back to the main page](../README.md)
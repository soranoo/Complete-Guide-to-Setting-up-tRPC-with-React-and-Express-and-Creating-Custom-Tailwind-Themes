# Complete Guide to Setting up tRPC with React and Express, and Creating Custom Tailwind Themes

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)&nbsp;&nbsp;&nbsp;[![Donation](https://img.shields.io/static/v1?label=Donation&message=❤️&style=social)](https://github.com/soranoo/Donation)

Give me a ⭐ if you like it.

## 📚 Table of Contents

- [📖 What is ...](#what-is)
- [📝 Before You Start](#📝-before-you-start)
    - [Knowledge](#knowledge)
    - [Tools](#tools)
- [🚀 Getting Started](#🚀-getting-started)
    - [🔌 Server Side](/docs/server.md)
        - [🛠️ Step 1 - Setup Typescript](/docs/server.md#🛠️-step-1---setup-typescript)
        - [🛠️ Step 2 - Setup Nodemon](/docs/server.md#🛠️-step-2---setup-nodemon)
        - [🛠️ Step 3 - Setup Express](/docs/server.md#🛠️-step-3---setup-express)
        - [🛠️ Step 4 - Setup tRPC](/docs/server.md#🛠️-step-4---setup-trpc)
        - [📒 References](/docs/server.md#📒-references)
    - [🖥️ Client Side](/docs/client.md)
        - [🛠️ Step 1 - Create a new Vite project](/docs/client.md#🛠️-step-1---create-a-new-vite-project)
        - [🛠️ Step 2 - Setup tRPC](/docs/client.md#🛠️-step-2---setup-trpc)
            - [Create a tRPC router](/docs/client.md#create-a-trpc-router)
            - [Create a tRPC provider](/docs/client.md#create-a-trpc-provider)
            - [Test your tRPC setup (optional)](/docs/client.md#test-your-trpc-setup-optional)
        - [🛠️ Step 3 - Setup Tailwind CSS](/docs/client.md#🛠️-step-3---setup-tailwind-css)
            - [Create a Tailwind CSS configuration file](/docs/client.md#create-a-tailwind-css-configuration-file)
        - [🛠️ Step 4 - Setup Tailwind CSS theme](/docs/client.md#🛠️-step-4---setup-tailwind-css-theme)
            - [Update Tailwind config file](/docs/client.md#update-tailwind-config-file)
            - [Import the theme file](/docs/client.md#import-the-theme-file)
            - [How to use the theme?](/docs/client.md#how-to-use-the-theme)
        - [🛠️ Minify HTML (Optional)](/docs/client.md#🛠️-minify-html-optional)
        - [🛠️ Alias (Optional)](/docs/client.md#🛠️-alias-optional)
            - [How to use alias?](/docs/client.md#how-to-use-alias)
        - [📒 References](/docs/client.md#📒-references)
- [🤝 Contributing](#🤝-contributing)
- [📜 License](#📜-license)
- [☕ Donation](#☕-donation)

<a name="what-is"></a>
## 📖 What is ...

### <-- tRPC -->

tRPC is a modern and lightweight RPC (Remote Procedure Call) framework for TypeScript and Node.js. It provides a simple and easy-to-use API for creating backend APIs that can be consumed by front-end applications. tRPC is designed to be easy to use, highly performant, and scalable.

One of the main benefits of using tRPC is its simplicity. It provides a minimalistic API that makes it easy to define your backend APIs, without any unnecessary complexity. Additionally, tRPC provides built-in support for TypeScript, which makes it easier to maintain your code and catch errors early in the development process.

Compared to other RPC frameworks, tRPC is also highly performant. It uses a lightweight binary protocol for communication, which reduces overhead and improves speed. Furthermore, tRPC is designed to be highly scalable, with built-in support for clustering and load balancing.

## 📝 Before You Start

### Knowledge

You should have the basic knowledge of the following frameworks and languages:

- [tRPC](https://trpc.io/)
- [TypeScript](https://www.typescriptlang.org/)
- Server Side:
    - [Node.js](https://nodejs.org/en/)
    - [Express](https://expressjs.com/)
- Client Side:
    - [React](https://reactjs.org/)
    - [Tailwind CSS](https://tailwindcss.com/)
    - [SCSS](https://sass-lang.com/)

### Tools

You should have the following tools installed:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))

> 📖 If you decide to use Yarn, replace all `npm` commands with `yarn`.

## 🚀 Getting Started

You may download the source code from [here](/demo) or follow the guide below to create your own project.

1. Create a new directory for your project. (we will call it `root` directory)
2. Open the directory in your terminal.
3. Follow Server Side guide [here](/docs/server.md).
4. Follow Client Side guide [here](/docs/client.md).


## 🤝 Contributing
Contributions are welcome!

## 📜 License
This guide is licensed under the [MIT License](LICENSE)

## ☕ Donation
Love the guide? Consider a donation to support my work.

[!["Donation"](https://raw.githubusercontent.com/soranoo/Donation/main/resources/image/DonateBtn.png)](https://github.com/soranoo/Donation) <- click me~
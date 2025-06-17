---
title: "Stop Using Express.js in 2023"
description: "Looking for the best JavaScript or TypeScript framework to build your REST APIs in 2023? Discover why you should stop using Express.js and explore faster and more modern alternatives."
pubDate: "2023-03-01"
image: "stop-using-express/main-image.webp"
imageAltText: "A gravestone with the Express.js logo on it"
---

For years, express.js has been the standard choice for building REST APIs with JavaScript or TypeScript. It has around 30 million weekly downloads (twice as much as React), and nearly all beginner tutorials recommend it. However, in today's landscape, there are now alternatives that offer better developer experiences and performance. In this post, we'll explore some of these alternatives and why you should consider them over Express.

## What's wrong with Express?

### 1. It's Unmaintained

Express hasn't seen any major updates or new features in years, with its website last being updated in 2017.

### 2. It's Slow

Since Express is primarily written in pre-ES6 JavaScript, it misses out on years of performance-enhancing updates and concepts.

### 3. It doesn't work well with TypeScript

Express wasn't designed with TypeScript in mind and requires a separate types package to work with it. Despite this, you will still encounter lots of `any`s.

## Alternatives to Express

### Fastify

Fastify is a modern alternative to Express. It's significantly faster and has a vast ecosystem of plugins. It shares a similar syntax with Express, so most of your Express knowledge will still apply to Fastify. With `@fastify/express` package, you can even use any express middleware module with fastify. Fastify is the most similar to express out of these alternatives, and It's the easiest to switch to. Use Fastify instead of Express for your next API to get instant performance and DX improvements.

[Learn more about Fastify](https://www.fastify.io/)

### Hono

Hono is a simple and minimal web framework that is even faster than Fastify. Although it lacks many of plugins, it can still handle most use cases. The primary selling point of Hono is that it can be used with runtimes other than Node.js, like Deno, Bun, or Cloudflare Edge Workers. Using Hono with these runtimes can make it even faster, cheaper and easier to host.

[Learn more about Hono](https://hono.dev/)

### tRPC

If you're building an API solely to consume it in a TypeScript client application (such as a React app), consider using tRPC. With this library, you can declare a function on your backend, and after a simple setup, call it on the frontend. tRPC automatically infers the input and return types of the function, resulting in TypeScript error messages and IntelliSense.

[Learn more about tRPC](https://trpc.io/)

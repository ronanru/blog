---
title: "Lucia Auth or NextAuth, which one to use in a Next.js project?"
description: "What is the best authentication library for Next.js?"
pubDate: "2023-10-22"
image: "lucia-auth-vs-next-auth/main-image.webp"
imageAltText: "Lucia Auth vs NextAuth"
---

Most modern apps require some form of authentication. There are many ways to implement it for a new Next.js app. You can, of course, roll your own auth, creating all necessary endpoints and writing all code for creating auth tokens yourself, only using the `crypto` module. I think every dev should do auth this way at least once, just to understand how everything works on a deeper level, but this approach involves a lot of boilerplate code, and even the smallest bug in the auth implementation can become a critical vulnerability. That's why many devs choose to use third-party services like Clerk or Supabase. They make it super easy to add simple authentication, but the moment after you reach more users than the free plan allows, they can become really pricey. The third and, in my opinion, the best way is to use an open-source auth library, like Auth.js or Lucia. But which one should you choose?

## Auth.js

Let's first talk about Auth.js. It started out as NextAuth, a library for Next.js, but now it features adapters for SvelteKit and SolidStart. With it, you create a new API endpoint (or a route handler with `/app`) and export a handler, provided by the library.

```ts
// /src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";

export default NextAuth({
  /* Configuration here */
});
```

It provides bindings to get the current user both on the client (with the `useSession()` hook) and server (`getServerSession()`). It automatically creates a sign-in page with all necessary inputs, handling all errors, and displaying them to the user (But you can still create your own login page, and most people do).

## Lucia Auth

Lucia is a newer, much simpler library. It works on any TypeScript server or framework but requires a bit more setup. It's a lot simpler to understand and much lighter. In their docs, the creator of Lucia calls Auth.js too bloated and opinionated. Instead of occupying its own endpoint, it gives you simple functions like `createSessionCookie()` or `createUser()`. With them, you can create an endpoint however you want; you can use tRPC, for example. The other difference is Lucia works only on the server, but you can pass the current session data to the client with a server component or `getServerSideProps` and use your favorite react state library to store it. To log out a user with Auth.js, we just need to call a `logOut()` function in the react code, but with Lucia, you need to create a new API endpoint where you call `invalidateSession()` and `setSession(null)`, and send a request to this endpoint from the frontend. It's more steps, but it's more flexible, and you can choose exactly how you implement everything. When you set up your project, you can copy most of the code from the [examples repo](https://github.com/lucia-auth/examples), so it's not harder to set up.

## Comparison

Both libraries work great with Next.js and different databases and ORMs like Prisma and Drizzle; both support all OAuth services you may need.

So, which one should you use? That depends on the situation. If you just need a simple "Sign in with Discord" button, NextAuth is the fastest way to add it, but I will recommend Lucia if you:

1. Need to add custom logic to the auth flow.

   If you need to add your own logic to the auth flow (for example, allow only users with a certain domain in their email to sign up), it's easy with Lucia: you search to where you call `createUser` and add an if statement, but with Auth.js, you need to dig through their documentation to find how to add a handler to a `createUser` event.

2. Need to use email and password auth.

   Auth.js is great for adding "Sign in with Discord" or "Sign in with GitHub" buttons, but they make creating email/password auth intentionally hard, to discourage newer devs from using it, due to security risks. Lucia, on the other hand, provides all necessary documentation and functions to create an email and password login.

In any other situations, both libraries are great.

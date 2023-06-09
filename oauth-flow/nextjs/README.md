# OAuth Sign-in flow

This is a NextJS/Supabase project showing how to do OAuth sign-in.

This project makes use of:

- [Zod](https://zod.dev/) Schema Validation library
- [Supabase Auth Helpers NextJS](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [DaisyUI](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/)

## Getting Started

You can get started with this locally by using the Supabase CLI. Make sure you have the CLI installed before continuing. You can find installation instructions [here](https://supabase.com/docs/guides/cli).

Create a copy of this project using the commands below:

```bash
npx degit supabase-community/supabase-by-example/oauth-flow/nextjs project-name
cd project-name
npm install # or pnpm install or yarn install
```

Edit the `supabase/config.toml` file and enable the appropriate third party provider and fill in the credentials by following the [guide](https://supabase.com/docs/guides/auth/social-login). 

Run the command below to start your local Supabase docker instance

```bash
npx supabase start
```

Copy `.env.example` file and rename it `.env`. Now copy the credentials you were given when you ran `supabase start` into this file.

Now we can start the project dev server:

```bash
npm run dev # or yarn dev or pnpm dev
```

We can now navigate to the `/auth/signin` url to sign in.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

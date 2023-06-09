# User Profile

This is a NextJS/Supabase project showing how to create a user profile along with how to store sensitive data that only the user of that data should be able to view using a one-to-one relationship and row level security (RLS). This project also demonstrates how to use a Postgres function to update two tables (which is done in a transaction so that if one fails there should be a rollback) using a `.rpc` function call. We also demonstrate how to use a generated column for the slug inside the database by making use of a Postgres function we create.

This project makes use of:

- [Zod](https://zod.dev/) Schema Validation library
- [Supabase Auth Helpers NextJS](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [DaisyUI](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) e2e testing
- [pgTAP](https://pgtap.org/) Postgres unit testing
- [Tailwind Profile from Codepen](https://codepen.io/ScottWindon/pen/XWdbPLm)

## Getting Started

You can get started with this locally by using the Supabase CLI. Make sure you have the CLI installed before continuing. You can find installation instructions [here](https://supabase.com/docs/guides/cli).

Create a copy of this project using the commands below:

```bash
npx degit supabase-community/supabase-by-example/reset-flow/nextjs-pages project-name
cd project-name
npm install # or pnpm install or yarn install
```

Run the command below to start your local Supabase docker instance

```bash
npx supabase start
```

Copy `.env.example` file and rename it `.env`. Now copy the credentials you were given when you ran `supabase start` into this file.

> Be sure to take a peek at the `.sql` files inside the `supabase/migrations` and `supabase/tests` directory. You can run the supabase tests by calling `npx supabase test db`.

Now we can start the project dev server:

```bash
npm run dev # or yarn dev or pnpm dev
```

We can now navigate to the `/auth/signup` url to create an account.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

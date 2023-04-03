# OAuth Sign-in flow

This is a SvelteKit/Supabase project showing how to do OAuth sign-in.

This project makes use of:

- [Zod](https://zod.dev/) Schema Validation library
- [Supabase Auth Helpers SvelteKit](https://supabase.com/docs/guides/auth/auth-helpers/sveltekit)
- [DaisyUI](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/)

## Getting started

You can get started with this locally by using the Supabase CLI. Make sure you have the CLI installed before continuing. You can find installation instructions [here](https://supabase.com/docs/guides/cli).

Create a copy of this project using the commands below:

```bash
npx degit supabase-community/supabase-by-example/oauth-flow/sveltekit project-name
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

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

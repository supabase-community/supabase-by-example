# Reset Password and Change Email flow

This is a SvelteKit/Supabase project showing how to do password reset and email change.

This project makes use of:

- [Zod](https://zod.dev/) Schema Validation library
- [Supabase Auth Helpers SvelteKit](https://supabase.com/docs/guides/auth/auth-helpers/sveltekit)
- [DaisyUI](https://daisyui.com/)
- [tailwindcss](https://tailwindcss.com/)

## Reset Password Flow in Server-side rendering (SSR) environment
![Password Reset Flow](Reset_Password_Flow_SSR.excalidraw.png)

## Getting started

You can get started with this locally by using the Supabase CLI. Make sure you have the CLI installed before continuing. You can find installation instructions [here](https://supabase.com/docs/guides/cli).

Now clone the project, then enter into the project directory.

Run the command below to start your local Supabase docker instance

```bash
supabase start
```

Now create an `.env` file inside of the project root with the credentials you were given when you ran `supabase start`.

Then lets install dependencies for the project:

```bash
npm install
```

Now we can start the project dev server

```bash
npm run dev
```

We can now navigate to the `/auth/signup` url to create an account.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

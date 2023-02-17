# Supabase by example

These are example projects using supabase in various frameworks. This repo took inspiration from [Solid Templates](https://github.com/solidjs/templates).

## Frameworks

- nextjs
- sveltekit

## Getting started

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

These templates are meant to be used as is via the [degit](https://github.com/Rich-Harris/degit) utility.

### Reset Password and Change Email flow

Replace `[framework]` with a framework from the supported list of [frameworks](#Frameworks)

```bash
npx degit silentworks/supabase-by-example/reset-flow/[framework] project-name
cd project-name
npm install # or pnpm install or yarn install
```

### Magic Link + Otp SignIn flow

Replace `[framework]` with a framework from the supported list of [frameworks](#Frameworks)

```bash
npx degit silentworks/supabase-by-example/magic-link/[framework] project-name
cd project-name
npm install # or pnpm install or yarn install
```

### OAuth Sign-in flow

Replace `[framework]` with a framework from the supported list of [frameworks](#Frameworks)

```bash
npx degit silentworks/supabase-by-example/oauth-flow/[framework] project-name
cd project-name
npm install # or pnpm install or yarn install
```

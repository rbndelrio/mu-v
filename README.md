# µv (*mu vee*) - Recommendation Engine

Hey, Selfbook devs! This is µv, a barebones movie recommendation engine based on the prompt you guys gave me.

## Interpretation Note

So there was a little ambiguity on how [the prompt](./PROMPT) defines "application". It could be interpreted as basic CLI with a file input or as a standalone web application. As such I'm going to attempt to satisfy both in the form of this monorepo.

## Usage

You can use the web app here: https://foo.bar

```sh
pnpm i
pnpm build
# pnpm coverage

# Use the cli
npx run mu-v 5 data/movies.json
```

## Structure

Folder structure looks as follows:

- `app` - A web app, framework yet to be chosen
- `data` - Static JSON and/or mocked database API
- `packages`
  - `cli` - terminal cli
  - `shared` - functions and types shared between both builds
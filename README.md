# µv (*mu vee*) - Recommendation Engine

Hey, Selfbook devs! This is µv, a barebones movie recommendation engine based on the prompt you guys gave me.

## Interpretation Notes

So there was a little ambiguity on how [the prompt](./PROMPT) defines "application". It could be interpreted as basic CLI with a file input or as a standalone web application. As such I'm going to attempt to satisfy both in the form of this monorepo.

Update: After getting the repo ready I slept on it and worked through how I'd like to approach the computational end of the app. I have a little working knowledge of graph data structures and think a weighted + undirected graph fits the requirements pretty well. Assuming I have the time for it today I'll implement it like so:

### 1. MVP
- [x] Create a "random" suggestion algorithm
- [x] Compute raw popularity stats for movie data
- [x] Attach to CLI

### 2. Full data structure
- [ ] Create a minimal `WeightedGraph` class and implement it as an adjacency list (optimized for looser relationships like this)
- [ ] Use that graph class for:
  - [ ] `UserGraph` for computing user overlap
  - [ ] `MovieGraph` for computing movie similarity/correlation
- [ ] Precompute these values
- [ ] Attach to CLI

### 3. Extra
- [ ] Crate basic web app implementation
- [X] Use "random" algorithm as a fallback?
- [ ] Polish web app UI


## Usage

You can use the web app here: https://foo.bar

```sh
pnpm i
pnpm build
# pnpm coverage

# Use the cli
npm link
mu-v --help
mu-v --file ./data/movies.json --user 27 --count 6
# npx run mu-v 5 data/movies.json
```

## Structure

Folder structure looks as follows:

- `app` - A web app, framework yet to be chosen
- `data` - Static JSON and/or mocked database API
- `packages`
  - `cli` - terminal cli
  - `shared` - functions and types shared between both builds
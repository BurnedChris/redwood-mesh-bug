# Redwood Mesh Bug

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

then

```terminal
yarn rw dev
```

and open another tab and run 

```terminal
yarn mesh
```

Mesh will be loaded onto `localhost:8912` and then once logged in on `localhost:8910`. mesh will send the api request through `localhost8912` to `localhost:8910`

# BUG

When the profile auth gets sent through mesh it will stip out the authentication token and auth-provider

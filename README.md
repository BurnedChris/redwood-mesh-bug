# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

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

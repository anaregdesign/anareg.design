# anaregdesign web

React Router framework mode と Vite で動く web app です。

## Development

Run the dev server:

```shellscript
npm ci
npm run dev
```

Run the LP quality gate before release:

```sh
npm run quality
```

The gate checks type generation, TypeScript, ESLint, production build, public LP
routes, core SEO assets, health response, and controlled invalid input behavior.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in React Router app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This app uses CSS Modules and a small global stylesheet.

# System

## Summary

The web app is a React Router framework mode application built with Vite and deployed to Cloud Run.

## Frameworks and Platforms

- React Router owns routing, server rendering, and production serving.
- Vite owns bundling and native CSS Module processing.
- Styling uses plain CSS and CSS Modules. Tailwind CSS is not part of the build pipeline.

## Technical Guardrails

- Component-specific styles should live next to their component or route as `*.module.css`.
- Global element defaults should stay in `app/styles/global.css`.
- Build output must not depend on Tailwind directives, Tailwind config, or Tailwind Vite plugins.

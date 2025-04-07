# LogiTrade Dashboard Deployment Guide

This document provides instructions for deploying the LogiTrade dashboard to Vercel, along with troubleshooting tips for common issues.

## Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- A Vercel account

## Local Build Testing

Before deploying to Vercel, test the build process locally:

```bash
# Step 1: Clean the environment
npm run clean

# Step 2: Reinstall dependencies
npm install

# Step 3: Test the build
npm run build

# Step 4: Preview the build (optional)
npm run preview
```

## Deploying to Vercel

### Option 1: Using the Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

### Option 2: Using the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in the Vercel dashboard
3. Configure the following settings:
   - Framework Preset: Vite
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Troubleshooting Vercel Deployment Issues

### Missing Module Error

If you encounter an error like:
```
Error: Cannot find module '/vercel/path0/dashboard/node_modules/vite/dist/node/cli.js'
```

**Solutions:**

1. **Check your Vercel project settings**:
   - Ensure the root directory is set correctly (should be `/dashboard` if that's where your package.json is)
   - Verify that the build command is `npm run vercel-build`

2. **Ensure Vite is correctly installed**:
   - The project has Vite in devDependencies
   - We've added a `.npmrc` file to ensure consistent installations

3. **Clean Installation**:
   - The `vercel-build` script in package.json ensures a clean build

### Git Submodules Warning

If you see warnings about git submodules:

**Solutions:**

1. **Update the Vercel configuration**:
   - We've added `"git": { "submodules": true }` to the vercel.json file

2. **Initialize submodules locally**:
   ```bash
   git submodule update --init --recursive
   ```

### Node.js Version Issues

**Solutions:**

1. **Specify Node.js version**:
   - We've added the Node.js version specification in vercel.json

## Optimizations

Our configuration includes several optimizations for Vercel deployment:

1. **Chunk splitting** in vite.config.ts for better performance
2. **Route handling** in vercel.json to support SPA routing
3. **Build debugging** with the debug:build script

## Manual Deployment Checklist

If all else fails, try these steps:

1. Delete `node_modules` and lock files:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall with a specific Node.js version:
   ```bash
   nvm use 18 # If you use nvm
   npm install
   ```

4. Build manually:
   ```bash
   npm run build
   ```

5. Deploy the `dist` folder manually using the Vercel CLI:
   ```bash
   vercel dist
   ```

## Environment Variables

For the Mapbox integration, you'll need to add your Mapbox token as an environment variable in Vercel:

- Name: `MAPBOX_TOKEN`
- Value: Your Mapbox public token

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Troubleshooting Vercel Deployments](https://vercel.com/docs/concepts/deployments/troubleshooting)

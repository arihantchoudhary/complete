// build.js - Custom build script that doesn't rely on Vite CLI
import { build } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the vite.config.js/ts file to get the configuration
async function buildApp() {
  console.log('Starting Vite build from custom script...');
  try {
    // Import the vite config
    const configFile = path.resolve(__dirname, 'vite.config.ts');
    if (!fs.existsSync(configFile)) {
      throw new Error(`Vite config file not found: ${configFile}`);
    }

    // Load the config
    const { default: configFn } = await import('./vite.config.ts');
    const config = configFn({ mode: 'production' });

    // Run the build
    await build({
      ...config,
      logLevel: 'info',
    });

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();

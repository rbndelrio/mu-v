import { defineConfig } from 'vite';
import { dependencies } from './package.json';


// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
const reactDeps: string[] = []
function renderChunks(deps: Record<string, string>) {
  let chunks: Record<string, string[]> = {};
  Object.keys(deps).forEach((key) => {
    if (reactDeps.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: reactDeps,
          ...renderChunks(dependencies),
        },
      },
    },
  },
})

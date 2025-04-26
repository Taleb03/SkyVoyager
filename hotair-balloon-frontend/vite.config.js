import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path'; // Need to import path


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./', './src'), // Assuming your source code is in 'src'
      // Or if "@/"" points to the root:
      // '@': path.resolve(__dirname, './')
    },
  },
});

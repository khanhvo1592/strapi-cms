import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import esbuildPlugin from 'vite-plugin-esbuild';

export default defineConfig({
  plugins: [
    react(),
    esbuildPlugin({
      jsx: 'transform', // Chỉ định `jsx` để chuyển đổi cú pháp JSX.
    }),
  ],
  esbuild: {
    loader: 'jsx',
    include: [
      /src\/.*\.js$/, 
      /node_modules\/strapi-plugin-ckeditor5\/.*/, // Bao gồm các file trong strapi-plugin-ckeditor5
    ],
    exclude: [],
  },
});

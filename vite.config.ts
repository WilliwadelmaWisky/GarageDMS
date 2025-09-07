import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@features", replacement: "/src/features" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@dtypes", replacement: "/src/types" },
      { find: "@utils", replacement: "/src/utils" }
    ],
  },
})

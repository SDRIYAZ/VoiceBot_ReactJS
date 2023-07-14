import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      brane: path.resolve(__dirname,"./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      services:`${path.resolve(__dirname, "./src/services/")}`,
      urls:`${path.resolve(__dirname, './src/urls/')}`,
      library: `${path.resolve(__dirname, './src/library/')}`,
      store: `${path.resolve(__dirname, './src/store/')}`,
      reducers: `${path.resolve(__dirname, './src/store/reducers/')}`,
    },
  },
});

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './env',
   // Load environment variables for different modes
   define: {
    ...loadEnv("development", process.cwd(), '.env.development'),
  },
})



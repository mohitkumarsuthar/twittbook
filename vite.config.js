import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}  // Set process.env to an empty object
  },
  // server: {
  //   host: '0.0.0.0', // Allows access via local IP
  //   port: 5000, // Ensure this is the correct port
  // },
})

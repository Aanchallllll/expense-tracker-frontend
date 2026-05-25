import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: '::',
  //   port: 5173
    
  //   // '''true' localhost'0.0.0.0'
  //    }
})

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from '@tailwindcss/vite'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: true,
    
//   },
// });
// D:\project\final-expense-tracker\frontend\expense-tracker\index.html
// D:\project\final-expense-tracker\frontend\expense-tracker\vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 3000, // Vite 개발 서버의 포트 번호 설정
  },
  build: {
    outDir: 'dist', // 빌드 결과물이 저장될 디렉토리
  },
});

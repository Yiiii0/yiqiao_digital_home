// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://yiqiaoz.me',
  // base: '/', // 自定义域名用户页不需要 base，默认就是根目录
  vite: {
    plugins: [tailwindcss()],
  },
});

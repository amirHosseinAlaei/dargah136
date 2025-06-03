import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      basicSsl(),
  VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
  manifest: {
    name: "Bazresi App",
    short_name: "Bazresi",
    description: "بازرسی - Progressive Web App",
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff", 
    icons: [
      {
        src: "/dolatMan.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/dolatMan.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/dolatMan.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
}),
    ],
    define: {
      "import.meta.env.APP_ENV": JSON.stringify(env.APP_ENV),
    },
    server: {
      host: "test.bazresi.ir",
      // https: true,  <=== این خط رو حذف کن
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

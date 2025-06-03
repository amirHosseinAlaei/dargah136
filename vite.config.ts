import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { fileURLToPath } from "url";

// ساخت __dirname در محیط ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // بارگذاری متغیرهای محیطی
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), basicSsl()],
    define: {
      "import.meta.env.APP_ENV": JSON.stringify(env.APP_ENV),
    },
    server: {
      host: "test.bazresi.ir",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

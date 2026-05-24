import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});

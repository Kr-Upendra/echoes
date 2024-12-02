import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "El Echoes",
        short_name: "El Echoes",
        description:
          "El Echoes is a personal memories app built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to capture, organize, and reflect on their thoughts, tasks, and significant life experiences. Echoes aims to create a vibrant platform for users to document their journey and revisit cherished memories.",
        theme_color: "#22C55E",
        background_color: "#22C55E",
        icons: [
          {
            src: "/icon_48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/icon_72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icon_96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icon_144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icon_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      devOptions: { enabled: true },
    }),
  ],
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
  },
});

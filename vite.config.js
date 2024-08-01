import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AxiosJwtReissue",
      formats: ["es"],
      fileName: () => "index.js", // Output file name
    },
    rollupOptions: {
      // Configure axios as an external library so that it is not included in the bundle.
      external: ["axios"],
      output: {
        globals: {
          axios: "axios",
        },
      },
    },
  },
});

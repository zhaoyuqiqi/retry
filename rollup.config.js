import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
export default defineConfig([
  {
    output: {
      file: "./dist/index.js",
      format: "es",
    },
    // {
    //   file: "./dist/index.js",
    //   format: "commonjs",
    // },
    input: "./src/index.ts",
    plugins: [
      terser(),
      typescript({
        compilerOptions: { lib: ["es5", "es6", "dom"], target: "es6" },
        module: "esnext",
      }),
    ],
  },
]);

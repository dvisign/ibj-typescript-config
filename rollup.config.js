import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"

export default {
  input: "./src/index.ts", // 가정된 시작점
  output: {
    dir: "dist",
    format: "umd",
    name: "ibjTypescriptConfig",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist" }),
    copy({
      targets: [
        {
          src: "./src/base.json",
          dest: "dist",
        },
        {
          src: "./src/next-config.json",
          dest: "dist",
        },
        {
          src: "./src/react-library.json",
          dest: "dist",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}

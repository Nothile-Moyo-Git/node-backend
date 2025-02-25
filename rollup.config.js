/**
 * Date created : 25/2/2025
 *
 * Author : Nothile Moyo
 *
 * Description: ESLint and prettier configuration for the backend
 */

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "api",
    format: "esm",
    sourceMap: true,
  },
  plugins: [
    resolve({
      extensions: [".ts", ".js"],
    }),
    typescript(),
  ],
};

import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

const isProd = !process.env.ROLLUP_WATCH

const banner = `
// ==UserScript==
// @name         ${pkg.name}
// @description  哔哩哔哩工具
// @author       ${pkg.author}
// @match        *://*.hacg.cat/*
// @version      ${pkg.version}
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hacg.cat
// ==/UserScript==
`

export default {
  input: "src/UserScript.bs.js",
  output: {
    format: "iife",
    file: "dist/UserScript.js",
    name: "_",
    banner,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    isProd &&
      terser({
        format: {
          comments: /UserScript|@\w+/,
        },
      }),
  ],
}

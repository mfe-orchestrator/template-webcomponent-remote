import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import typescript from "@rollup/plugin-typescript"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [react(), libInjectCss()],
        // Vite resolves the tsconfig "paths" aliases natively since v8.
        resolve: { tsconfigPaths: true },
        base: env.VITE_PUBLIC_PATH,
        build: {
            copyPublicDir: false,
            lib: {
                formats: ["es", "umd"],
                entry: resolve(import.meta.dirname, "src/index.ts"),
                name: "index",
                fileName: format => `index.${format}.js`
            },
            rolldownOptions: {
                // Everything that reaches React stays outside the bundle and is read from the
                // globals the host sets (window.React, window.ReactDOM, window.ReactJSXRuntime):
                // a bundled copy would call require() for them, which a browser does not have.
                external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
                output: {
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM",
                        "react-dom/client": "ReactDOM",
                        "react/jsx-runtime": "ReactJSXRuntime"
                    }
                },
                plugins: [
                    typescript({
                        tsconfig: "./tsconfig.json",
                        declaration: true,
                        declarationDir: "dist",
                        rootDir: "src"
                    })
                ]
            }
        }
    }
})

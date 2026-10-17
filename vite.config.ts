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
                external: ["react", "react-dom"],
                output: {
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM"
                    },
                    exports: "named"
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

import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"

function checkEnvVariable(variableName: string) {
  if (!process.env[variableName]) {
    throw new Error(`Error: Please provide a value for ${variableName}.`)
  }
}

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  checkEnvVariable("NODE_ENV")
  checkEnvVariable("VITE_API_URL")

  return defineConfig({
    plugins: [
      react(),
      svgr({
        include: "**/*.svg",
        svgrOptions: {
          icon: true,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
  })
}

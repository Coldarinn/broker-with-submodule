import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin"

export default defineConfig({
  trashAssetsBeforeRuns: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ) {
      return getCompareSnapshotsPlugin(on, config)
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
  },
})

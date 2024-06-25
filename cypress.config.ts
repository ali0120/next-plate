import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    experimentalStudio: true,
    baseUrl: "http://localhost:3000/",
    experimentalModifyObstructiveThirdPartyCode: true,
    videosFolder: "cypress/e2e/videos",
    screenshotsFolder: "cypress/e2e/screenshots",
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalWebKitSupport: true,
    experimentalRunAllSpecs: true,
  },
});

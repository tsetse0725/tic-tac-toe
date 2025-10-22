
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  timeout: 30_000,

  retries: process.env.CI ? 1 : 0,

  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],

  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    viewport: { width: 1280, height: 800 },
  },


  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },




  ],


  webServer: {

    command: process.env.CI ? "yarn start -p 3000" : "yarn dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000, 
  },
});

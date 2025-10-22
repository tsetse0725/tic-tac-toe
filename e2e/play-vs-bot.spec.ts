import { test, expect } from "@playwright/test";

test.describe("Tic-Tac-Toe Gameplay", () => {
  test.beforeEach(async ({ page }) => {
   
    await page.addInitScript(() => {
      localStorage.setItem(
        "ttt_settings",
        JSON.stringify({ soundOn: false, volume: 0, botDelayMs: 300, haptics: "off" })
      );
    });
  });

  test("Bot mode → should detect a winner (or draw) robustly", async ({ page }) => {
    await page.goto("/");

    
    await page.getByRole("button", { name: "vs Bot" }).click();

    const cell = (i: number) => page.getByTestId(`cell-${i}`);
    const dialog = page.getByTestId("winner-modal");

    
    const preference = [0, 2, 6, 8, 4, 1, 3, 5, 7];

    for (let turn = 0; turn < 6; turn++) {
    
      for (const mv of preference) {
        const content = (await cell(mv).textContent())?.trim();
        if (!content) {
          await cell(mv).click();
          break;
        }
      }

    
      await page.waitForTimeout(600);

    
      if (await dialog.isVisible()) {
        await expect(dialog.getByText(/Winner:|Draw/i)).toBeVisible();
        return;
      }
    }

    
    await expect(dialog).toBeVisible();
  });
});

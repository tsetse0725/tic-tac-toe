import { test, expect } from "@playwright/test";

test.describe("PvP Mode gameplay", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const pvpButton = page.getByRole("button", { name: "PvP" });
    if (await pvpButton.isVisible()) await pvpButton.click();
  });

  test("Player X and O alternate turns correctly", async ({ page }) => {
    const cell = (i: number) => page.getByTestId(`cell-${i}`);
    await cell(0).click(); 
    await expect(cell(0)).toHaveText("X");
    await cell(1).click(); 
    await expect(cell(1)).toHaveText("O");
    await cell(2).click(); 
    await expect(cell(2)).toHaveText("X");
  });

  test("Player X wins when 3 in a row", async ({ page }) => {
    const cell = (i: number) => page.getByTestId(`cell-${i}`);
    await cell(0).click(); 
    await cell(3).click(); 
    await cell(1).click(); 
    await cell(4).click(); 
    await cell(2).click(); 

    
    const dialog = page.getByTestId("winner-modal");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Winner:\s*X/i)).toBeVisible();
  });
});

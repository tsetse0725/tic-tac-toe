import { test, expect } from "@playwright/test";

test.describe("Winner (PvP)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const pvpBtn = page.getByRole("button", { name: "PvP" });
    if (await pvpBtn.isVisible()) await pvpBtn.click();
  });

  test("Player X wins after 3 moves in a row", async ({ page }) => {
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

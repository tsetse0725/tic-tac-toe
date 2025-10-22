import { test, expect } from "@playwright/test";

test.describe("Accessibility and Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Board has accessible role and label", async ({ page }) => {
    await expect(page.getByRole("grid", { name: /tic tac toe board/i })).toBeVisible();
  });

  test("Squares are focusable and navigable via arrow keys", async ({ page }) => {
    const board = page.getByRole("grid");
    await board.focus();

    
    const first = page.getByTestId("cell-0");
    await first.focus();
    await expect(first).toBeFocused();

    
    await page.keyboard.press("ArrowRight");
    const second = page.getByTestId("cell-1");
    await expect(second).toBeFocused();

    
    await page.keyboard.press("Space");
    await expect(second).toHaveText("X");
  });

  test("Enter key places a move", async ({ page }) => {
    const first = page.getByTestId("cell-0");
    await first.focus();
    await page.keyboard.press("Enter");
    await expect(first).toHaveText("X");
  });
});

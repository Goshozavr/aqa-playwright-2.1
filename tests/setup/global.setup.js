import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_USER_PATH } from "../src/data/constants/storageStates";
import WelcomePage from "../src/pageObjects/welcomePage/WelcomePage";
import { USERS } from "../src/data/users";

setup("do login", async ({ page }) => {
  console.log("PROJECT SETUP");
  const welcomePage = new WelcomePage(page);
  await welcomePage.visit();
  const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup();
  const garagePage = await signInPopup.loginWithCredentials(
    USERS.POP.email,
    USERS.POP.password
  );
  await expect(garagePage.addCarButton).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE_USER_PATH });
  //await page.getByLabel("Email").fill("aqa-nbm2@test.com");
  //await page.getByLabel("Password").fill("Bbbbbbb7");
  //await page.getByText("Login").click();

  // Wait until the page actually signs in.
  //await expect(page.getByText("Hello, user!")).toBeVisible();
});

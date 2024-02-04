import BasePage from "../BasePage.js";

export default class ProfilePage extends BasePage {
  constructor(page) {
    super(page, "/panel/profile");
    this.addCarButton = this._page.locator("button", {
      hasText: "Edit profile",
    });
  }
}

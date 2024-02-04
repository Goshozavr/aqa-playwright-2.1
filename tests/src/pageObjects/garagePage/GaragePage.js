import BasePage from "../BasePage.js";
import ProfilePage from "../profilePage/ProfilePage.js";
import AddCarPopup from "./components/AddCarPopup.js";

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page, "/panel/garage");
    this.addCarButton = this._page.locator("button", { hasText: "Add car" });
    this.navigationListBtn = this._page.locator("button", {
      hasText: "My profile",
    });
    this.linkToProfile = this._page.locator("a", { hasText: "Profile" });
  }

  async openAddCarPopup() {
    await this.addCarButton.click();
    return new AddCarPopup(this._page);
  }

  async openNavList() {
    await this.navigationListBtn.click();
    return new NavigationList(this._page);
  }

  async goToProfileBtn() {
    await this.linkToProfile.click();
    return new ProfilePage(this._page);
  }
}

import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import BaseComponent from "./BaseComponent.js";

export default class SignInPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator("app-signin-modal"));
    this.emailInput = this.container.locator('[name="email"]');
    this.passwordInput = this.container.locator('[name="password"]');
    this.error = this.container.locator(".invalid-feedback p");
    this.submitButton = this.container.locator(".btn-primary");
  }

  async loginWithCredentials(email, password) {
    await this.fill(email, password);
    await this.submitButton.click();
    return new GaragePage(this._page);
  }

  async fill(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
}

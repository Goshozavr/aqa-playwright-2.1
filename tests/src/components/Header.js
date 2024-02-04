import BaseComponent from "./BaseComponent.js";

export default class Header extends BaseComponent {
  constructor(page) {
    super(page, page.locator("header.header"));
    this.signInButton = this.container.locator(".header_signin");
    this.guestLoginButton = this.container.locator("button.-guest");
  }
}

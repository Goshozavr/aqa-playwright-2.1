import Header from "../components/Header.js";
import BaseComponent from "../components/BaseComponent.js";

export default class BasePage extends BaseComponent {
  constructor(page, url) {
    super(page, page.locator("html"));
    this._page = page;
    this._url = url;
    this.header = new Header(page);
  }

  get page() {
    return this._page;
  }

  async visit() {
    await this._page.goto(this._url);
  }
}

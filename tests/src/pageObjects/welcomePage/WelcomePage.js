import SignInPopup from "../../components/SignInPopup.js";
import BasePage from "../BasePage.js";
import GaragePage from "../garagePage/GaragePage.js";

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page, "/", ".header_signin");
    //this._page = page; - більше непотрібні, бо вони є в бейс пейдж
    //this._url = "/";
    //this.signInButton = page.locator(".header_signin"); // - перенесли в хедер
  }

  //async visit() {  - також тут більше непотрібен
  //await this._page.goto(this._url);
  //}

  async clickSignInButtonAndOpenPopup() {
    //await this.signInButton.click(); - нижче заміна, бо є у хедері
    await this.header.signInButton.click();
    const popup = new SignInPopup(this._page);
    return popup;
  }

  async loginAsGuest() {
    await this.header.guestLoginButton.click();
    return new GaragePage(this._page);
  }
}

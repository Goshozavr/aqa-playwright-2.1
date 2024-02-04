import BaseController from "./BaseController";

export default class AuthController extends BaseController {
  #LOGIN_PATH = "/auth/signin"; // # робить шлях приватним
  constructor(jar) {
    super(jar);
  }
  async login(requestBody) {
    return this.client.post(this.#LOGIN_PATH, requestBody);
  }
}

import { CookieJar } from "tough-cookie";
import AuthController from "../controllers/AuthController";
import CarController from "../controllers/carController";
import { expect } from "@playwright/test";

export default class APIClient {
  constructor(jar) {
    // звідси залогінені куки прокидуються далі в кожен контролер
    this.authController = new AuthController(jar);
    this.carController = new CarController(jar);
  }

  static async authenticate(email, password) {
    const jar = new CookieJar();
    const authController = new AuthController(jar);
    const res = await authController.login({
      email: email,
      password: password,
      remember: false,
    });
    expect(res.status).toBe(200);

    return new APIClient(jar); // звідси передаються залогінені куки нагору в конструктор
  }
}

/*для дз:

const client = await APIClient.authenticate("somemail", "somepass")
await client.carController.createCar() - тут юзер уже буде залогінений, кукі вже будуть поширені на нього
*/

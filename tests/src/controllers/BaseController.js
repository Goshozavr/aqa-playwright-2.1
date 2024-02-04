import axios from "axios";
import { wrapper } from "axios-cookiejar-support";

export default class BaseController {
  constructor(jar) {
    this.client = wrapper(
      axios.create({
        baseURL: "https://qauto.forstudy.space/api",
        jar,
        validateStatus: () => true,
      })
    );
  }
}

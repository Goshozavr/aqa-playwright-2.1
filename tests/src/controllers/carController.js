import BaseController from "./BaseController";

export default class CarController extends BaseController {
  #CREATE_CAR_PATH = "/cars"; // # робить шлях приватним
  #BRANDS_PATH = "/cars/brands";
  #MODELS_PATH = "/cars/models";
  #USER_CARS_PATH = "/cars";
  #DELETE_CAR_PATH = "/cars";
  constructor(jar) {
    super(jar);
  }
  async createCar(requestBody) {
    return this.client.post(this.#CREATE_CAR_PATH, requestBody);
  }

  async getBrands() {
    return this.client.get(this.#BRANDS_PATH);
  }

  async getBrandByBrandId(brandId) {
    return this.client.get(`${this.#BRANDS_PATH}?carBrandId=${brandId}`);
  }

  async getModels(brandId) {
    return this.client.get(`${this.#MODELS_PATH}?carBrandId=${brandId}`);
  }

  async getModelsByModelId(modelId) {
    return this.client.get(`${this.#MODELS_PATH}?carModelId=${modelId}`);
  }

  async getUserCars() {
    return this.client.get(this.#USER_CARS_PATH);
  }

  async getUserCarById(id) {
    return this.client.get(`${this.#USER_CARS_PATH}/${id}`);
  }

  async editCarById(id, requestBody) {
    return this.client.put(`${this.#USER_CARS_PATH}/${id}`, requestBody);
  }

  async deleteCarById(id) {
    return this.client.delete(`${this.#DELETE_CAR_PATH}/${id}`);
  }
}

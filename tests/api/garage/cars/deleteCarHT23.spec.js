import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe.only("Delete request", () => {
  let client;
  let carId;

  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      USERS.BALBES.email,
      USERS.BALBES.password
    );
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.Q7.id,
      mileage: 11,
    });

    carId = createCarResponse.data.data.id;
  });

  test("Delete car", async () => {
    const deleteCar = await client.carController.deleteCarById(carId);
    const getCar = await client.carController.getUserCarById(carId);
    expect(deleteCar.status).toBe(200);
    expect(getCar.status).toBe(404);
  });
});

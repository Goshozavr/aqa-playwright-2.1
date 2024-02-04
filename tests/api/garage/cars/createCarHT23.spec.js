import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe.only("Create car", () => {
  let client;
  let carId;
  let brands;
  test("Create car", async () => {
    client = await APIClient.authenticate(USERS.POP.email, USERS.POP.password);
    const response = await client.carController.getBrands();
    brands = response.data.data;
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.A6.id,
      mileage: Math.floor(Math.random() * 100),
    });

    carId = createCarResponse.data.data.id;
    expect(createCarResponse.status).toBe(201);
    expect(createCarResponse.data.data).toMatchObject({
      id: carId,
      carBrandId: createCarResponse.data.data.carBrandId,
      carModelId: createCarResponse.data.data.carModelId,
      initialMileage: createCarResponse.data.data.mileage,
      mileage: createCarResponse.data.data.mileage,
      brand: createCarResponse.data.data.brand,
      model: createCarResponse.data.data.model,
      logo: createCarResponse.data.data.logo,
    });
  });
});

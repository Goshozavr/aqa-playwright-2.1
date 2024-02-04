import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Delete request", () => {
  let client;
  let carId;
  let brandId;
  let modelId;
  let initMiliage;
  let updatedMilAt;
  let carCreAt;
  let brandName;
  let modelName;
  let logoName;
  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      USERS.BYVALIJ.email,
      USERS.BYVALIJ.password
    );
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.Q7.id,
      mileage: 11,
    });

    [
      carId,
      brandId,
      modelId,
      initMiliage,
      updatedMilAt,
      carCreAt,
      brandName,
      modelName,
      logoName,
    ] = [
      createCarResponse.data.data.id,
      createCarResponse.data.data.carBrandId,
      createCarResponse.data.data.carModelId,
      createCarResponse.data.data.initMiliage,
      Date.now(),
      createCarResponse.data.data.carCreatedAt,
      createCarResponse.data.data.brand,
      createCarResponse.data.data.model,
      createCarResponse.data.data.logo,
    ];
  });

  test("Edit car", async () => {
    const editCar = await client.carController.editCarById(carId, {
      id: carId,
      carBrandId: brandId,
      carModelId: modelId,
      initialMileage: initMiliage,
      updatedMileageAt: updatedMilAt, //"2024-02-03T17:40:24.000Z",
      carCreatedAt: carCreAt, //"2024-02-03T17:40:24.000Z",
      mileage: 28,
      brand: brandName,
      model: modelName,
      logo: logoName,
    });
    const getCar = await client.carController.getUserCarById(carId);
    expect(editCar.status).toBe(200);
    expect(getCar.data.data.mileage).toEqual(editCar.data.data.mileage);
  });
});

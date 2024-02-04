import { test, expect } from "@playwright/test";
import APIClient from "../../../src/client/APIClient";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Get requests", () => {
  let client;
  let carId;

  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      USERS.TRUS.email,
      USERS.TRUS.password
    );
    const createCarResponse = await client.carController.createCar({
      carBrandId: CAR_BRANDS.AUDI.id,
      carModelId: CAR_MODELS.AUDI.Q7.id,
      mileage: 11,
    });

    carId = createCarResponse.data.data.id;
  });

  test("Get all cars", async () => {
    const getAllCars = await client.carController.getUserCars();
    expect(getAllCars.status).toBe(200);
    expect(getAllCars.data.data[0]).toMatchObject({
      id: carId,
      carBrandId: getAllCars.data.data[0].carBrandId,
      carModelId: getAllCars.data.data[0].carModelId,
      initialMileage: getAllCars.data.data[0].mileage,
      updatedMileageAt: getAllCars.data.data[0].updatedMileageAt,
      mileage: getAllCars.data.data[0].mileage,
      brand: getAllCars.data.data[0].brand,
      model: getAllCars.data.data[0].model,
      logo: getAllCars.data.data[0].logo,
    });
  });

  test("Get all brands", async () => {
    const getAllBrands = await client.carController.getBrands();
    expect(getAllBrands.status).toBe(200);
    expect(getAllBrands.data.data[0]).toMatchObject({
      id: 1,
      title: "Audi",
      logoFilename: "audi.png",
    });
  });

  test("Get all models", async () => {
    const getAllModels = await client.carController.getModels();
    expect(getAllModels.status).toBe(200);
    expect(getAllModels.data.data[0]).toMatchObject({
      id: 1,
      carBrandId: 1,
      title: "TT",
    });
  });

  test("Get single car", async () => {
    const getSingleCar = await client.carController.getUserCarById(carId);
    expect(getSingleCar.status).toBe(200);
    expect(getSingleCar.data.data.id).toEqual(carId);
  });

  test("Get car brand", async () => {
    const getCarBrand = await client.carController.getBrandByBrandId();
    expect(getCarBrand.status).toBe(200);
    console.log(getCarBrand.data);
    expect(getCarBrand.data.data[0].title).toEqual("Audi");
  });

  test("Get car model", async () => {
    const getCarModel = await client.carController.getModelsByModelId();
    expect(getCarModel.status).toBe(200);
    expect(getCarModel.data.data[0].title).toEqual("TT");
  });

  /*test("Get requests", async () => {
    // так мені подобається більше, нижче буде розбивка по кожному окремому запиту
    const getAllBrands = await client.carController.getBrands();
    const getAllModels = await client.carController.getModels();
    const getAllCars = await client.carController.getUserCars();
    const getSingleCar = await client.carController.getUserCarById(carId);
    const getCarBrand = await client.carController.getBrandByBrandId(carId);
    const getCarModel = await client.carController.getModelsByModelId(carId);
    expect(getAllBrands.status).toBe(200);
    expect(getAllModels.status).toBe(200);
    expect(getAllCars.status).toBe(200);
    expect(getSingleCar.status).toBe(200);
    expect(getCarBrand.status).toBe(200);
    expect(getCarModel.status).toBe(200);
  });*/
});

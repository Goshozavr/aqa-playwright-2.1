import axios from "axios";
import { USERS } from "../../../src/data/users";
import { test, expect } from "@playwright/test";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { negativeFixture } from "./fixtures/createCar.fixtures";
import APIClient from "../../../src/client/APIClient";

test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Positive case use header", () => {
      let client = axios.create({
        baseURL: '"https://qauto.forstudy.space/api',
      });
      let brands;
      test.beforeAll(async () => {
        const signInResponse = await client.post("/auth/signin", {
          email: USERS.POP.email,
          password: USERS.POP.password,
          remember: false,
        });
        console.log(signInResponse);
        const cookie = signInResponse.headers["set-cookie"][0].split(";")[0];
        client = axios.create({
          baseURL: "https://qauto.forstudy.space/api",
          headers: {
            cookie,
          },
        });

        const response = await axios.get("/cars/brands");
        brands = response.data.data;
      });
      test.afterAll(async () => {
        const userCars = await client.get("/cars");
        await Promise.all(
          userCars.data.data.map((car) => client.delete(`/cars/${car.id}`))
        );
      });

      test(`Create car`, async () => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            const modelsResponse = await axios.get(
              `/cars/models?carBrandId=${brand.id}`
            );
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model: ${model.title}`, async () => {
                const createCarRequestBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };
                const createCarResponse = await axios.post(
                  "https://qauto.forstudy.space/api/cars",
                  createCarRequestBody
                );
                expect(
                  createCarRequestBody.status,
                  "Status code should be valid"
                ).toBe(201);
              });
            }
          });
        }
      });
    });
  });
});
test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Positive case", () => {
      let client;

      let brands;
      test.beforeAll(async () => {
        client = await APIClient.authenticate(
          USERS.POP.email,
          USERS.POP.password
        );
        const response = await client.carController.getBrands();
        brands = response.data.data;
      });
      test.afterAll(async () => {
        const userCars = await client.carController.getUserCars();
        await Promise.all(
          userCars.data.data.map((car) =>
            client.carController.deleteCarById(car.id)
          )
        );
      });
      test("Create car", async () => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            const modelsResponse =
              await client.carController.getModelsByBrandId(brand.id);
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model: ${model.title}`, async () => {
                const createCarReqBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };
                const createCarResponse = await client.carController.createCar(
                  createCarReqBody
                );
                expect(
                  createCarResponse.status,
                  "Status code should be valid"
                ).toBe(201);
              });
            }
          });
        }
      });
    });
  });
});

test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Negative case", () => {
      const jar = new CookieJar();
      let client = wrapper(
        axios.create({
          baseURL: "https://qauto.forstudy.space/api",
          jar,
          validateStatus: (status) => status < 501,
        })
      );
      let brands;
      test.beforeAll(async () => {
        await client.post("/auth/signin", {
          email: USERS.POP.email,
          password: USERS.POP.password,
          remember: false,
        });

        const response = await axios.get("/cars/brands");
        brands = response.data.data;
      });
      test("Should return error message when mileage is missing.", async () => {
        const brand = brands[0];
        const modelsResponse = await axios.get(
          `/cars/models?carBrandId=${brand.id}`
        );
        const models = modelsResponse.data.data;

        const model = models[0];
        const createCarReqBody = {
          carBrandId: brand.id,
          carModelId: model.id,
        };
        const createCarResponse = await axios.post(
          "https://qauto.forstudy.space/api/cars",
          createCarReqBody
        );
        expect(createCarReqBody.status, "Status code should be valid").toBe(
          400
        );
        expect(createCarResponse.data, "Response body should be valid").toEqual(
          { status: "error", message: "Mileage is required" }
        );
      });
      test("Should return error message when brandId is missing.", async () => {
        const brand = brands[0];
        const modelsResponse = await axios.get(
          `/cars/models?carBrandId=${brand.id}`
        );
        const models = modelsResponse.data.data;

        const model = models[0];
        const createCarReqBody = {
          //carBrandId: brand.id,
          carModelId: model.id,
          mileage: Math.floor(Math.random() * 100),
        };
        const createCarResponse = await axios.post(
          "https://qauto.forstudy.space/api/cars",
          createCarReqBody
        );
        expect(createCarReqBody.status, "Status code should be valid").toBe(
          400
        );
        expect(createCarResponse.data, "Response body should be valid").toEqual(
          { status: "error", message: "Car brand id is required" }
        );
      });
      test("Should return error message when modelId is missing.", async () => {
        const brand = brands[0];
        const modelsResponse = await axios.get(
          `/cars/models?carBrandId=${brand.id}`
        );
        const models = modelsResponse.data.data;

        const model = models[0];
        const createCarReqBody = {
          carBrandId: brand.id,
          mileage: Math.floor(Math.random() * 100),
        };
        const createCarResponse = await axios.post(
          "https://qauto.forstudy.space/api/cars",
          createCarReqBody
        );
        expect(createCarReqBody.status, "Status code should be valid").toBe(
          400
        );
        expect(createCarResponse.data, "Response body should be valid").toEqual(
          { status: "error", message: "Car model id is required" }
        );
      });
    });
  });
});

test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Negative case with fixtures", () => {
      const jar = new CookieJar();
      let client = wrapper(
        axios.create({
          baseURL: "https://qauto.forstudy.space/api",
          jar,
          validateStatus: (status) => status < 501,
        })
      );
      let brands;
      test.beforeAll(async () => {
        await client.post("/auth/signin", {
          email: USERS.POP.email,
          password: USERS.POP.password,
          remember: false,
        });

        const response = await axios.get("/cars/brands");
        brands = response.data.data;
      });

      for (const { title, inputData, expectedData } of negativeFixture) {
        test(title, async () => {
          const createCarResponse = await axios.post(
            "https://qauto.forstudy.space/api/cars",
            inputData
          );
          expect(createCarReqBody.status, "Status code should be valid").toBe(
            expectedData
          );
          expect(
            createCarResponse.data,
            "Response body should be valid"
          ).toEqual(expectedData.data);
        });
      }
    });
  });
});

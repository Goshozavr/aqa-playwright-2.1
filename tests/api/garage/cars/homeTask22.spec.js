import axios from "axios";
import { USERS } from "../../../src/data/users";
import { test, expect } from "@playwright/test";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { negativeFixture } from "./fixtures/createCar.fixtures";

test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Positive cases", () => {
      const jar = new CookieJar();
      let client = wrapper(
        axios.create({
          baseURL: "https://qauto.forstudy.space/api",
          jar,
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
      test.afterAll(async () => {
        const userCars = await client.get("/cars");
        await Promise.all(
          userCars.data.data.map((car) => client.delete(`/cars/${car.id}`))
        );
      });

      test("Create car", async () => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            const modelsResponse = await axios.get(
              `/cars/models?carBrandId=${brand.id}`
            );
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model: ${model.title}`, async () => {
                const createCarReqBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };
                const createCarResponse = await axios.post(
                  "https://qauto.forstudy.space/api/cars",
                  createCarReqBody
                );
                expect(
                  createCarReqBody.status,
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
    test.describe("Negative cases", () => {
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

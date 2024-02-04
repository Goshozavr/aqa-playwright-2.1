import { expect, test } from "@playwright/test";
import { USERS } from "../../../src/data/users";
import APIClient from "../../../src/client/APIClient";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Cars", () => {
  test.describe("Delete", () => {
    test.describe("Positive case", () => {
      let carId;
      let client;

      test.beforeAll(async () => {
        client = await APIClient.authenticate(
          USERS.POP.email,
          USERS.POP.password
        );
        const createCarResponse = await client.carController.createCar({
          carBrandId: CAR_BRANDS.AUDI.id,
          carModelId: CAR_MODELS.AUDI.Q7.id,
          mileage: 11,
        });

        carId = createCarResponse.data.data.id; //для дз можливо треба буде винести створення машини в біфор іч
      });

      test("Delete car", async () => {
        await test.step("Delete car", async () => {
          const response = await client.carController.deleteCarById(carId);
          expect(response.status, "Status should be valid").toBe(200);
        });
        await test.step("Get car by id", async () => {
          const response = await client.carController.getUserCarById(carId);
          expect(response.status, "Status should be valid").toBe(404);
          expect(
            response.data,
            "Response body shoud be valid for deleted car"
          ).toEqual({
            status: "error",
            message: "Car not found",
          });
        });
      });
    });
  });
});

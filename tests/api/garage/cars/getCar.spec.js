import { expect, test } from "@playwright/test";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import { USERS } from "../../../src/data/users";
import { CAR_BRANDS } from "../../../src/data/dict/carBrands";
import { CAR_MODELS } from "../../../src/data/dict/carModels";

test.describe("Cars", () => {
  test.describe("Get by id", () => {
    test.describe("Positive case", () => {
      let carId;
      const carBrand = CAR_BRANDS.AUDI;
      const carModel = CAR_MODELS.AUDI.A8;
      const carRequestBody = {
        carBrandId: carBrand.id,
        carModelId: carModel.id,
        mileage: 123,
      };
      const jar = new CookieJar();
      let client = wrapper(
        axios.create({
          baseURL: "https://qauto.forstudy.space/api",
          jar,
          validateStatus: () => true,
        })
      );

      async function createCar(requestData) {
        const createCarResponse = await client.post("/cars", requestData);
        return createCarResponse.data.data.id;
      }

      test.beforeAll(async () => {
        await client.post("/auth/signin", {
          email: USERS.POP.email,
          password: USERS.POP.password,
          remember: false,
        });

        carId = await createCar(carRequestBody);
      });
      test.afterAll(async () => {
        await client.delete(`/cars/${car.id}`);
      });

      test("Get car by id", async () => {
        const startTime = Date.now();
        const response = await client.get(`/cars/${carId}`);
        expect(response.status, "Status should be valid").toBe(200);
        expect(response.data.data).toMatchObject({
          id: carId,
          carBrandId: carRequestBody.carBrandId,
          carModelId: carRequestBody.carModelId,
          initialMileage: carRequestBody.mileage,
          //updatedMileageAt: expect.any(String), //"2021-05-17T15:26:36.000Z"
          mileage: carRequestBody.mileage,
          brand: carBrand.title,
          model: carModel.title,
          logo: carBrand.logoFilename,
        });
        expect(
          new Date(response.data.data.updatedMileageAt).getTime()
        ).toBeLessThanOrEqual(startTime); //краще для таких перевірок використовувати якусь бібліотеку дат
      });
    });
  });
});

//контроллери - це класи, які в собі інкапсулюють логіку запитів
//вони пишуться щоб прибрати дублювання коду та зробити тести більш читабельними

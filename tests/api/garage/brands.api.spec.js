import { test, expect } from "@playwright/test";
//const { should } = require("chai");

/*test("should return car brands", async () => {
  const response = await axios.get(
    "https://qauto.forstudy.space/api/cars/brands"
  );
  expect(response.data.status).toBe("ok");
  should.lengthOf(response.data.data, 5, "All car brands should be returned");
});*/

test("Get car brands", async () => {
  const carBrandsResponse = await fetch(
    "https://qauto.forstudy.space/api/cars/brands"
  );
  const body = await carBrandsResponse.json();
  expect(body).toEqual([]);
});

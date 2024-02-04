export const negativeFixture = [
  {
    title: "test name1",
    inputData: {
      carBrandId: 1, // or brand.id etc
      carModelId: 1, // or model.id etc
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Mileage is required" },
    },
  },
  {
    title: "test name2",
    inputData: {
      carModelId: 1, // or model.id etc
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car brand id is required" },
    },
  },
  {
    title: "test name3",
    inputData: {
      carBrandId: 1, // or brand.id etc
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car model id is required" },
    },
  },
];

/*
звідси брав інфу 
test("Should return error message when mileage is missing", async () => {
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
    //console.log(createCarResponse.data);// - тут отримаємо очікуваний текст ерору
    expect(createCarResponse.data, "Response body should be valid").toEqual(
      { status: "error", message: "Mileage is required" }
    );
  });*/

export const negativeFixture = [
  {
    title: "Mileage abscent",
    inputData: {
      carBrandId: 1,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Mileage is required" },
    },
  },
  {
    title: "Brand id abscent",
    inputData: {
      carModelId: 1,
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car brand id is required" },
    },
  },
  {
    title: "Model id abscent",
    inputData: {
      carBrandId: 1,
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Car model id is required" },
    },
  },
  {
    title: "Brand id is invalid",
    inputData: {
      carBrandId: 10,
      carModelId: 1,
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Bad request" },
    },
  },
  {
    title: "Model id is invalid",
    inputData: {
      carBrandId: 1,
      carModelId: 10,
      mileage: Math.floor(Math.random() * 100),
    },
    expectedData: {
      statusCode: 400,
      data: { status: "error", message: "Bad request" },
    },
  },
];

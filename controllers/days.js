const Days = require("../schemas/days");
const Product = require("../schemas/products");
const Summary = require("../schemas/summary");
const moment = require("moment-timezone");
const { findById } = require("../schemas/users");

const addProduct = async (body, userId) => {
  try {
    const { date, productId, weight: amount } = body;
    const dayCurrent = {
      $gte: moment.tz(new Date(`${date}T00:00:00.000`), "America/Bogota").utc(),
      $lte: moment.tz(new Date(`${date}T23:59:59.999`), "America/Bogota").utc(),
    };
    const dataProduct = await Product.findById(productId);
    const { _id, weight, calories, title, groupBloodNotAllowed } = dataProduct;

    const daySummary = await Summary.findOne({ date: dayCurrent, userId });
    const { _id: sumId, left, consumed, dailyRate } = daySummary;

    const caloriesPerAmount = Math.ceil((amount / weight) * calories);
    const consumedLeft = left - caloriesPerAmount;
    const consumedTotal = consumed + caloriesPerAmount;
    const perOfDay = (consumedTotal / dailyRate) * 100;

    daySummary.left = consumedLeft;
    daySummary.consumed = consumedTotal;
    daySummary.percentOfDailyRate = perOfDay;
    await daySummary.save();

    const dataDayUpdate = {
      $push: { productsId: _id },
      userId,
      weight,
      calories: caloriesPerAmount,
      sumId,
    };
    const dataDay = await Days.findOneAndUpdate(
      {
        userId,
        date: dayCurrent,
      },
      dataDayUpdate,
      {
        new: true,
      }
    );
    console.log(dataDay);
    return {
      addedProduct: {
        product: { _id, weight, calories, title, groupBloodNotAllowed },
        dayId: dataDay._id,
        userId,
        weight: amount,
        calories: caloriesPerAmount,
      },
      summary: daySummary,
    };
  } catch (error) {
    console.error("database error:", error);
  }
};
const getDayInfo = async (body, userId) => {
  const dayRange = {
    $gte: moment
      .tz(new Date(`${body.date}T00:00:00.000`), "America/Bogota")
      .utc(),
    $lte: moment
      .tz(new Date(`${body.date}T23:59:59.999`), "America/Bogota")
      .utc(),
  };
  const dataDay = await Days.findOne({ date: dayRange, userId });
  const dataSummary = await Summary.findOne({ date: dayRange, userId });
  console.log(dataDay.productsId);
  const getProductsAllowed = dataDay.productsId.map((idProduct) =>
    Product.findById(idProduct)
  );
  const getAllowed = await Promise.all(getProductsAllowed);

  // Procesar las respuestas
  const data = await Promise.all(getAllowed.map((product) => product.toJSON()));
  return {
    idDay: dataDay._id,
    eatenProducts: data,
    date: body.date,
    daySummary: dataSummary,
  };
};

module.exports = {
  addProduct,
  getDayInfo,
};

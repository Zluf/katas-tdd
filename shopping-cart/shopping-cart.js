const productList = {
  iceberg: {
    cost: 1.55,
    revenuePercent: 15,
    taxPercent: 21,
  },
  tomato: {
    cost: 0.52,
    revenuePercent: 15,
    taxPercent: 21,
  },
  chicken: {
    cost: 1.34,
    revenuePercent: 12,
    taxPercent: 21,
  },
};

let shoppingCart = {
  productsAdded: {},
  promotion: null,
  totalProducts: 0,
  totalPrice: 0,
};

const process = (objOfCommands, shoppingCart) => {
  const result = objOfCommands.reduce((acc, curCommand) => {
    const roundUp = (price) => Math.ceil(price * 100) / 100;

    if (curCommand.action === "add-product") {
      const product = productList[curCommand.productName];
      const pricePerUnit =
        product.cost + (product.cost * product.revenuePercent) / 100;
      const taxAmount = (pricePerUnit * product.taxPercent) / 100;
      const priceWithVat = roundUp(pricePerUnit) + roundUp(taxAmount);

      return {
        ...acc,
        productsAdded: {
          ...acc.productsAdded,
          [curCommand.productName]: {
            productName: curCommand.productName,
            quantity:
              (acc[curCommand.productName]?.quantity ?? 0) +
              curCommand.quantity,
            priceWithVat,
          },
        },
        totalProducts: acc.totalProducts + curCommand.quantity,
        totalPrice:
          acc.totalProducts > 0
            ? Object.values(acc.productsAdded).reduce((acc, curPr) => {
                return acc + curPr.priceWithVat;
              }, 0) +
              priceWithVat * curCommand.quantity
            : priceWithVat * curCommand.quantity,
      };
    }
  }, shoppingCart);

  return result;
};

module.exports = { process, shoppingCart, productList };

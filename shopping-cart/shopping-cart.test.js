const cart = require("./shopping-cart");

describe("process function", () => {
  let shCart = cart.shoppingCart;

  test("view empty shopping cart", () => {
    expect(shCart).toEqual({
      productsAdded: {},
      promotion: null,
      totalProducts: 0,
      totalPrice: 0,
    });
  });

  test("adding 1 product to the shopping cart", () => {
    shCart = cart.process(
      // Issue 7.9.23: 1st arg wasn't wrapped in array, both args were instead
      [{ action: "add-product", productName: "iceberg", quantity: 1 }],
      shCart
    );

    expect(shCart).toEqual({
      productsAdded: {
        iceberg: { productName: "iceberg", quantity: 1, priceWithVat: 2.17 },
      },
      promotion: null,
      totalProducts: 1,
      totalPrice: 2.17,
    });
  });

  test("adding 2 more products to the shopping cart", () => {
    shCart = cart.process(
      [{ action: "add-product", productName: "tomato", quantity: 2 }],
      shCart
    );

    expect(shCart).toEqual({
      productsAdded: {
        iceberg: { productName: "iceberg", quantity: 1, priceWithVat: 2.17 },
        tomato: { productName: "tomato", quantity: 2, priceWithVat: 0.73 },
      },
      promotion: null,
      totalProducts: 3,
      totalPrice: 3.63,
    });
  });
});

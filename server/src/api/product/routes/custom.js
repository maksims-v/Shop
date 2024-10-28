module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/search",
      handler: "product.filterSearch",
    },
    {
      method: "GET",
      path: "/products/relatedproducts",
      handler: "product.relatedProducts",
    },
  ],
};

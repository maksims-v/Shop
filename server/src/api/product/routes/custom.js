module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/filter",
      handler: "product.filterSearch",
    },
    {
      method: "GET",
      path: "/products/:slug",
      handler: "product.findOne",
    },
    {
      method: "GET",
      path: "/products/:slug/build",
      handler: "product.build",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

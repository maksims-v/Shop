module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/:slug",
      handler: "product.findOne",
      config: {
        auth: false,
      },
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

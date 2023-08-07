module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products",
      handler: "product.filterSearch",
    },
    {
      method: "GET",
      path: "/products/:gender/:category/:subcategory/:slug",
      handler: "product.slug",
    },
    // {
    //   method: "GET",
    //   path: "/products/:slug/build",
    //   handler: "product.build",
    //   config: {
    //     auth: false,
    //     policies: [],
    //   },
    // },
  ],
};

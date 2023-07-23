module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/filter",
      handler: "product.filterSearch",
    },
    {
      method: "GET",
      path: "/products/:gender",
      handler: "product.genderSearch",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/products/:gender/:category",
      handler: "product.categorySearch",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/products/:gender/:category/:subcategory",
      handler: "product.subCategorySearch",
      config: {
        auth: false,
        policies: [],
      },
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

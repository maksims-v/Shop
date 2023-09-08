module.exports = {
  routes: [
    {
      method: "GET",
      path: "/equipments/shop",
      handler: "equipment.search",
    },
    {
      method: "GET",
      path: "/equipments/relatedproducts",
      handler: "equipment.relatedProducts",
    },
  ],
};

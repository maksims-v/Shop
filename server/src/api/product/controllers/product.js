"use strict";
const _ = require("lodash");
/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async slug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.entityService.findMany("api::product.product", {
      filters: { slug: slug },
      populate: { image: true, size: true },
    });

    const title = entity[0].title ? entity[0].title : "";

    const entity2 = await strapi.entityService.findMany(
      "api::product.product",
      {
        filters: {
          $and: [{ title: { $eqi: title } }, { slug: { $ne: slug } }],
          publishedAt: {
            $ne: null,
          },
        },
        populate: { image: true, size: true },
      }
    );

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const sanitizedEntity2 = await this.sanitizeOutput(entity2, ctx);

    return this.transformResponse(sanitizedEntity, sanitizedEntity2);
  },

  async filterSearch(ctx) {
    const { search, pmin, pmax, brands } = ctx.query;

    const brandsSplitToArr = brands ? brands.split(",") : [];

    let priceMin = pmin ? pmin : 0;
    let priceMax = pmax ? pmax : 10000;

    const entity = await strapi.entityService.findMany("api::product.product", {
      filters: {
        $and: [
          {
            title: { $startsWith: search },
          },
          {
            $or: [
              { price: { $between: [priceMin, priceMax] } },
              { salePrice: { $between: [priceMin, priceMax] } },
            ],
          },
          {
            brand: {
              $eqi: brandsSplitToArr,
            },
          },
        ],
      },
      publishedAt: {
        $ne: null,
      },
      populate: { image: true },
    });

    if (entity.length !== 0) {
      const minMaxPriceArr = entity?.map((item) => {
        if (item.sale) {
          return item.salePrice;
        }
        return item.price;
      });

      priceMin = Math.min.apply(null, minMaxPriceArr);
      priceMax = Math.max.apply(null, minMaxPriceArr);
    }

    const priceFilter = entity.filter((item) => {
      if (!item.sale) {
        return item;
      } else {
        if (item.salePrice >= pmin) return item;
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(priceFilter, ctx);
    const sanitizedEntity2 = await this.sanitizeOutput(
      { priceMin, priceMax },
      ctx
    );

    return this.transformResponse(sanitizedEntity, sanitizedEntity2);
  },

  async genderSearch(ctx) {
    const { gender } = ctx.params;

    const entity = await strapi.entityService.findMany("api::product.product", {
      filters: {
        gender: {
          $eqi: ["all", gender],
        },
        publishedAt: {
          $ne: null,
        },
      },
      populate: { image: true },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async categorySearch(ctx) {
    const { gender, category } = ctx.params;

    const entity = await strapi.entityService.findMany("api::product.product", {
      filters: {
        $and: [
          {
            gender: gender,
          },
          {
            category: category,
          },
        ],
        publishedAt: {
          $ne: null,
        },
      },
      populate: { image: true },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async subCategorySearch(ctx) {
    const { gender, category, subcategory } = ctx.params;

    const entity = await strapi.entityService.findMany("api::product.product", {
      filters: {
        $and: [
          {
            gender: gender,
          },
          {
            category: category,
          },
          {
            subcategory: subcategory,
          },
        ],
        publishedAt: {
          $ne: null,
        },
      },
      populate: { image: true },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  // build: async (ctx) => {
  //   let product = await strapi.db
  //     .query("api::product.product")
  //     .findOne(ctx.params);
  //   if (!product.attributes.length) return;

  //   const cartesian = (sets) => {
  //     return sets.reduce(
  //       (acc, curr) => {
  //         return acc
  //           .map((x) => {
  //             return curr.map((y) => {
  //               return x.concat([y]);
  //             });
  //           })
  //           .flat();
  //       },
  //       [[]]
  //     );
  //   };

  //   //capitalize function
  //   const capitalize = (s) => {
  //     if (typeof s !== "string") return "";
  //     return s
  //       .split(" ")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ");
  //   };

  //   const { attributes } = product;

  //   const variations = cartesian(
  //     _.map(attributes, ({ name, options }) =>
  //       _.map(options, ({ value }) => ({ [name]: value }))
  //     )
  //   );

  //   const records = _.map(variations, (variation) => {
  //     let name = variation.reduce(
  //       (acc, current) => acc + " " + Object.values(current)[0],
  //       product.title
  //     );
  //     let slug = variation
  //       .reduce(
  //         (acc, current) =>
  //           acc + "-" + Object.values(current)[0].replace(/ /g, "-"),
  //         product.slug
  //       )
  //       .toLowerCase();

  //     return {
  //       product: product.id,
  //       title: capitalize(name),
  //       slug: slug,
  //       price: product.price,
  //       description: product.description,
  //       availableQty: product.availableQty,
  //       ...("sale" in product && { sale: product.sale }),
  //     };
  //   });

  //   try {
  //     const createAllRecords = await Promise.all(
  //       records.map(
  //         (record) =>
  //           new Promise(async (resolve, reject) => {
  //             console.log(record.price);

  //             try {
  //               const created = await strapi.entityService.create(
  //                 "api::variation.variation",
  //                 {
  //                   data: {
  //                     slug: record.slug,
  //                     price: record.price,
  //                   },
  //                 }
  //               );
  //               resolve(created);
  //             } catch (err) {
  //               reject(err);
  //             }
  //           })
  //       )
  //     );
  //     ctx.send(createAllRecords);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
}));

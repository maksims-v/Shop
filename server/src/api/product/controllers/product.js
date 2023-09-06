"use strict";
const _ = require("lodash");
/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async filterSearch(ctx) {
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const {
      sale,
      brands,
      category,
      gender,
      subcat,
      size,
      search,
      pmin,
      pmax,
      currentPage,
      sorting,
    } = sanitizedQueryParams;

    let howToSort = sorting;

    if (sorting == "Sort By") {
      howToSort = false;
    } else if (sorting == "Latest arrivals") {
      howToSort = false;
    } else if (sorting == "Price asc.") {
      howToSort = "asc";
    } else if (sorting == "Price desc.") {
      howToSort = "desc";
    }

    // pagination logic
    let startPage = 0;
    let limitPage = 21 * currentPage;
    if (currentPage > 1) {
      startPage = limitPage - 21;
    } else {
      startPage = 0;
    }

    //---------------

    const searchItem = search ? search : "";
    const salesSplitToArr = sale ? sale.split(",") : [];
    const brandsSplitToArr = brands ? brands.split(",") : [];
    const categorySplitToArr = category ? category.split(",") : [];
    const genderSplitArr = gender ? gender.split(",") : [];
    const subCategoryArr = subcat ? subcat.split(",") : [];

    if (gender == "all") genderSplitArr.push("women's", "men's");
    if (gender == "men's" || gender == "women's") genderSplitArr.push("all");
    console.log(genderSplitArr);

    let sizeArr = [];
    if (
      size === "false" ||
      size === "undefined" ||
      size == undefined ||
      size === ""
    ) {
      sizeArr = [];
    } else {
      sizeArr = size.split(",");
    }
    // sizeArr = size ? size.split(",") : [];

    let priceMin = pmin ? pmin : 0;
    let priceMax = pmax ? pmax : 9999;

    // "sale" on/off
    let saleItem = false;
    salesSplitToArr.map((item) => {
      if (item == "Sale") {
        saleItem = !saleItem;
      }
    });
    //---------------

    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        start: startPage,
        limit: 21,
        sort: howToSort ? [{ price: howToSort }] : { id: "desc" },
        filters: {
          publishedAt: {
            $null: null,
          },
          $and: [
            {
              $or: [
                { title: { $startsWith: searchItem } },
                {
                  subproductcategory: {
                    subproductcategory: {
                      $startsWith: searchItem,
                    },
                  },
                },
              ],
            },
            {
              $or: [{ price: { $between: [priceMin, priceMax] } }],
            },
            {
              brand: {
                $eqi: brandsSplitToArr,
              },
            },
            {
              gender: {
                $eqi: genderSplitArr,
              },
            },
            {
              category: {
                $eqi: categorySplitToArr,
              },
            },
            {
              subcategory: {
                $eqi: subCategoryArr,
              },
            },
            {
              $or: [
                { sale: saleItem ? true : true },
                { sale: saleItem ? true : false },
              ],
            },
            {
              size: {
                size: {
                  $eqi: sizeArr,
                },
              },
            },
          ],
        },
        populate: {
          image: true,
          size: true,
        },
      }
    );

    const pagination = await strapi.entityService.findMany(
      "api::product.product",
      {
        filters: {
          publishedAt: {
            $null: null,
          },
          $and: [
            {
              $or: [
                { title: { $startsWith: searchItem } },
                {
                  subproductcategory: {
                    subproductcategory: {
                      $startsWith: searchItem,
                    },
                  },
                },
              ],
            },
            {
              $or: [{ price: { $between: [priceMin, priceMax] } }],
            },
            {
              brand: {
                $eqi: brandsSplitToArr,
              },
            },
            {
              gender: {
                $eqi: genderSplitArr,
              },
            },
            {
              category: {
                $eqi: categorySplitToArr,
              },
            },
            {
              subcategory: {
                $eqi: subCategoryArr,
              },
            },
            {
              $or: [
                { sale: saleItem ? true : true },
                { sale: saleItem ? true : false },
              ],
            },
            {
              size: {
                size: {
                  $eqi: sizeArr,
                },
              },
            },
          ],
        },
        populate: { size: true },
      }
    );

    // get Min, Max price
    if (products.length !== 0) {
      const minMaxPriceArr = pagination?.map((item) => {
        return item.price;
      });

      priceMin = Math.min.apply(null, minMaxPriceArr);
      priceMax = Math.max.apply(null, minMaxPriceArr);
    }
    //---------------

    // get all products count
    const paginationLength = pagination.length;
    //---------------

    // get pages count
    const pages = Math.ceil(paginationLength / 21);
    //---------------

    // get gendre
    const allGender = pagination.map((item) => {
      return item.gender.toLowerCase();
    });
    const getUniqGendre = allGender.filter(
      (item, id) => allGender.indexOf(item) === id
    );
    //---------------

    // get category
    const allCategory = pagination.map((item) => {
      return item.category.toLowerCase();
    });
    const getUniqCategory = allCategory.filter(
      (item, id) => allCategory.indexOf(item) === id
    );
    //---------------

    // get subCategory
    const allSubCategory = pagination.map((item) => {
      return item.subcategory.toLowerCase();
    });
    const getUniqSubCategory = allSubCategory.filter(
      (item, id) => allSubCategory.indexOf(item) === id
    );
    //---------------

    // get brands
    const allBrands = pagination.map((item) => {
      return item.brand.toLowerCase();
    });

    const getUniqBrands = allBrands.filter(
      (item, id) => allBrands.indexOf(item) === id
    );
    //---------------

    // get sizes
    const allSizes = pagination.map((item) => {
      return item.size;
    });
    const sortSizes = allSizes.filter(
      (item, id) => allSizes.indexOf(item) === id
    );

    const filterSizes = sortSizes.map((item) => {
      const sort = item.map((items) => {
        return items.size;
      });
      return sort;
    });

    const filterSizesConcCat = filterSizes.flat(2);
    const getUniqSize = filterSizesConcCat.filter(
      (item, id) => filterSizesConcCat.indexOf(item) === id
    );

    //---------------

    //sortedProductsImages
    const sortedProducts = products.map((item) => ({
      ...item,
      image: item.image[0].formats.medium.url,
    }));

    //---------------

    const sanitizedEntity = await this.sanitizeOutput({ sortedProducts }, ctx);
    const sanitizedPagination = await this.sanitizeOutput(
      {
        data: pagination,
        priceMin,
        priceMax,
        total: paginationLength,
        pages,
        category: getUniqCategory,
        genders: getUniqGendre,
        subCategory: getUniqSubCategory,
        brands: getUniqBrands,
        sizes: getUniqSize,
      },
      ctx
    );

    return this.transformResponse(sanitizedEntity, sanitizedPagination);
  },

  async newArrivals(ctx) {
    const entity = await strapi.entityService.findMany("api::product.product", {
      limit: 20,
      filters: {
        new: true,
        publishedAt: {
          $ne: null,
        },
      },
      populate: { image: true },
    });

    //sortedProductsImages
    const sortedProducts = entity.map((item) => ({
      ...item,
      image: item.image[0].formats.small.url,
    }));

    const sanitizedEntity = await this.sanitizeOutput({ sortedProducts }, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async relatedProducts(ctx) {
    const { gender, category, subcat, id } = ctx.query;

    const productId = id;

    const entity = await strapi.entityService.findMany("api::product.product", {
      limit: 20,
      filters: {
        publishedAt: {
          $ne: null,
        },
        $not: {
          id: productId,
        },
        $and: [
          {
            gender: {
              $eqi: gender,
            },
          },
          {
            category: {
              $eqi: category,
            },
          },
          {
            subcategory: {
              $eqi: subcat,
            },
          },
        ],
      },

      populate: { image: true },
    });

    //sortedProductsImages
    const sortedProducts = entity.map((item) => ({
      ...item,
      image: item.image[0].formats.small.url,
    }));

    const sanitizedEntity = await this.sanitizeOutput({ sortedProducts }, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));

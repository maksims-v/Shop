"use strict";
const _ = require("lodash");

/**
 * page-home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::page-home.page-home",
  ({ strapi }) => ({
    async pageHomes(ctx) {
      const entity = await strapi.entityService.findMany(
        "api::page-home.page-home",
        {
          populate: {
            layout_header: {
              populate: {
                linkList: {
                  populate: {
                    link: "*",
                  },
                },
              },
            },
          },
          filters: {
            publishedAt: {
              $null: null,
            },
          },
        }
      );

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);

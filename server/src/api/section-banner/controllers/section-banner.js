"use strict";

/**
 * section-banner controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::section-banner.section-banner",
  ({ strapi }) => ({
    async sectionBanner(ctx) {
      const entity = await strapi.entityService.findMany(
        "api::section-banner.section-banner",
        {
          populate: {
            image: "*",
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

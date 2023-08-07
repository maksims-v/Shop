'use strict';

/**
 * header-path router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::header-path.header-path');

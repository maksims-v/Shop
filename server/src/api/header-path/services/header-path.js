'use strict';

/**
 * header-path service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::header-path.header-path');

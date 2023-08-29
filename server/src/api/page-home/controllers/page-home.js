"use strict";
const _ = require("lodash");

/**
 * page-home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page-home.page-home");

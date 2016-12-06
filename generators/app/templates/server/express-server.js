"use strict";
const Promise = require("bluebird");
const express=require("express");
const app = express();
const path = require("path");
const _ = require("lodash");
const defaultConfig = require("electrode-confippet").config;
const Confippet = require("electrode-confippet");

const loadConfigs = function(userConfig) {
	//use confippet to merge user config and default config
	if ( userConfig.plugins && userConfig.plugins.electrodeStaticPaths && userConfig.plugins.electrodeStaticPaths.enable ) {
		userConfig.plugins.electrodeStaticPaths.enable = false;
	}
	return Confippet.util.merge(defaultConfig,userConfig);
}

const setStaticPaths = function() {
	app.use(express.static(path.join(__dirname, defaultConfig.$("plugins.electrodeStaticPaths.options.pathPrefix"))));
}

const setRouteHandler = function() {
	const registerRoutes = require(path.join(process.cwd(),defaultConfig.$("plugins.webapp.module")));
	return registerRoutes(app, defaultConfig.$("plugins.webapp.options"),
		function (err) {
			if (err) {
				console.log(err);
			}
		}
	);
}

const startServer = function() {
	app.listen(defaultConfig.$("connections.default.port"), function() {
		console.log("App listening on port: ", defaultConfig.$("connections.default.port"));
	});
}

module.exports = function electrodeServer(userConfig) {
	const promise = Promise.resolve({})
	.then(loadConfigs)
	.then(setStaticPaths)
	.then(setRouteHandler)
	.then(startServer);
}

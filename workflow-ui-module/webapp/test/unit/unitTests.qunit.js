/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"wasteManagement/workflow-ui-module/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

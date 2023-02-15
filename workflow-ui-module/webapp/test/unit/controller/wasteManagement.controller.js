/*global QUnit*/

sap.ui.define([
	"wasteManagement/workflow-ui-module/controller/wasteManagement.controller"
], function (Controller) {
	"use strict";

	QUnit.module("wasteManagement Controller");

	QUnit.test("I should test the wasteManagement controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

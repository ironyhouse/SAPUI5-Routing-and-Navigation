sap.ui.define(
  ["sap/ui/demo/nav/controller/BaseController", "sap/ui/core/UIComponent"],
  function (BaseController, UIComponent) {
    "use strict";

    return BaseController.extend(
      "sap.ui.demo.nav.controller.employee.overview.EmployeeOverview",
      {
        onInit: function () {
          UIComponent.getRouterFor(this).attachTitleChanged(function (oEvent) {
            var sTitle = oEvent.getParameter("title");

            // Example usage: set the browser page title (optional)
            document.title = sTitle;
          });

		  UIComponent.getRouterFor(this)
            .getRoute("employeeOverview")
            .attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			var sArguments = oEvent.getParameter("arguments");

			console.log(sArguments);
		},
      }
    );
  }
);

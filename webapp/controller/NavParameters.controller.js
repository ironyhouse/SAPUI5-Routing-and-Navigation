sap.ui.define(
  ["sap/ui/demo/nav/controller/BaseController", "sap/ui/core/UIComponent"],
  function (BaseController, UIComponent) {
    "use strict";

    return BaseController.extend("sap.ui.demo.nav.controller.NavParameters", {
      onInit: function () {
        UIComponent.getRouterFor(this)
          .attachRoutePatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        var sArguments = oEvent.getParameter("arguments");

        console.log(sArguments);
      },
    });
  }
);

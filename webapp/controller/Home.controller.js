sap.ui.define(
  ["sap/ui/demo/nav/controller/BaseController", "sap/ui/core/UIComponent"],
  function (BaseController, UIComponent) {
    "use strict";

    return BaseController.extend("sap.ui.demo.nav.controller.Home", {
      onInit: function () {
        UIComponent.getRouterFor(this).attachTitleChanged(function (oEvent) {
          var sTitle = oEvent.getParameter("title");

          // Example usage: set the browser page title (optional)
          document.title = sTitle;
        });
      },

      onDisplayNotFound: function () {
        // display the "notFound" target without changing the hash
        this.getRouter().getTargets().display("notFound", {
          fromTarget: "home",
        });
      },

      onNavToMandatory: function () {
        this.getRouter().navTo("NavMandatoryParameters", {
          mandatory: "mandatoryValue",
        });
      },

      onNavToQuery: function () {
        this.getRouter().navTo("NavQueryParameters", {
          oQuery: {
            category: "notebook",
            price: "desc",
          },
        });
      },

      onNavToRestAsString: function () {
        this.getRouter().navTo("NavRestAsStringParameters", {
          oQuery: {
            category: "notebook",
            price: "desc",
          },
        });
      },

      onNavToEmployee: function () {
        this.getRouter().navTo("SecondPage", {});
      },

    });
  }
);

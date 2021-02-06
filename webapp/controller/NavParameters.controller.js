sap.ui.define(
  [
    "sap/ui/demo/nav/controller/BaseController",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/HashChanger",
  ],
  function (BaseController, UIComponent, JSONModel, HashChanger) {
    "use strict";

    return BaseController.extend("sap.ui.demo.nav.controller.NavParameters", {
      onInit: function () {
        UIComponent.getRouterFor(this)
          // .getRoute("NavMandatoryParameters")
          .attachRoutePatternMatched(this._onObjectMatched, this);

        var oModel = new JSONModel({
          pattern: "",
          hash: "",
          parameters: ""
        });
        this.getView().setModel(oModel);
      },

      _onObjectMatched: function (oEvent) {
        var sRouteArguments = oEvent.getParameter("arguments"),
          sRouteName = oEvent.getParameter("name"),
          sParameters = "";

        // set hash
        HashChanger.getInstance().attachEvent("hashChanged", function (oEvent) {
          var sHash = oEvent.getParameter("newHash");
          this.getView().getModel().setProperty("/hash", "/" + sHash);
        }.bind(this));

        // set pattern
        this.getView().getModel().setProperty("/pattern", sRouteName);

        // set parameters
        if (Object.keys(sRouteArguments).length) {
          Object.entries(sRouteArguments).forEach(function(key) {
            sParameters += `${key[0]}:`;
            sParameters += ` ${key[1]}`;
          }.bind(this))
        } else {
          sParameters += `None`;
        }

        this.getView().getModel().setProperty("/parameters", sParameters);
        console.log(sParameters)
      },
    });
  }
);

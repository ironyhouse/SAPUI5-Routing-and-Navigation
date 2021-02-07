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
          .attachRouteMatched(this._onObjectMatched, this);

        var oModel = new JSONModel({
          pattern: "",
          hash: "",
          parameters: "",
        });
        this.getView().setModel(oModel);
      },

      _onObjectMatched: function (oEvent) {
        var sRouteArguments = oEvent.getParameter("arguments"),
          sRouteName = oEvent.getParameter("name"),
          sParameters = "",
          sHash;

        // get page hash
        sHash = HashChanger.getInstance().getHash();
        // set hash
        this.getView()
          .getModel()
          .setProperty("/hash", "/" + sHash);

        // set pattern
        this.getView().getModel().setProperty("/pattern", sRouteName);

        var query;
        if (Object.keys(sRouteArguments)[0]) {
          query = Object.keys(sRouteArguments)[0].substr(0, 1);
        }
        // create parameters
        if (query === "?") {
          sParameters += `{\n`;
          sParameters += `. . . . ${
            Object.entries(sRouteArguments)[0][0]
          }: {\n`;
          Object.entries(Object.entries(sRouteArguments)[0][1]).forEach(
            function (key) {
              sParameters += `. . . . . . . . ${key[0]}:`;
              sParameters += ` ${key[1]}, \n`;
            }.bind(this)
          );
          sParameters += `. . . . }\n`;
          sParameters += `}`;
        } else if (Object.keys(sRouteArguments).length) {
          sParameters += `{\n`;
          Object.entries(sRouteArguments).forEach(
            function (key) {
              sParameters += `. . . . ${key[0]}:`;
              sParameters += ` ${key[1]}, \n`;
            }.bind(this)
          );
          sParameters += `}`;
        } else {
          sParameters += `None`;
        }
        // set parameters
        this.getView().getModel().setProperty("/parameters", sParameters);
      },
    });
  }
);

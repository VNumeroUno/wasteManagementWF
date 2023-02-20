sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "wasteManagement/workflowuimodule/model/models",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Label",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/core/Core",
    "sap/m/upload/UploadSet",
    "sap/ui/core/Fragment",
    "sap/ui/unified/FileUploaderParameter",
    "sap/m/library",
  ],
  function (UIComponent, Device, models, Dialog, DialogType, Button, ButtonType, Label, MessageBox, MessageToast, Text, TextArea, Core, UploadSet, Fragment, FileUploaderParameter, MLibrary) {
    "use strict";

    return UIComponent.extend(
      "wasteManagement.workflowuimodule.Component",
      {
        metadata: {
          manifest: "json",
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
          // call the base component's init function
          UIComponent.prototype.init.apply(this, arguments);

          // enable routing
          this.getRouter().initialize();

          // set the device model
          this.setModel(models.createDeviceModel(), "device");

          this.setTaskModels();

          this.getInboxAPI().addAction(
            {
              action: "APPROVE",
              label: "Approve",
              type: "accept", // (Optional property) Define for positive appearance
            },
            function () {
              this.completeTask(true);
            },
            this
          );

          this.getInboxAPI().addAction(
            {
              action: "REJECT",
              label: "Reject",
              type: "reject", // (Optional property) Define for negative appearance
            },
            function () {
              // this.onShowActionDialog();
              this.completeTask(false);
            },
            this
          );
        },

        setTaskModels: function () {
          // set the task model
          var startupParameters = this.getComponentData().startupParameters;
          this.setModel(startupParameters.taskModel, "task");

          // set the task context model
          var taskContextModel = new sap.ui.model.json.JSONModel(
            this._getTaskInstancesBaseURL() + "/context"
          );
          this.setModel(taskContextModel, "context");
        },

        _getTaskInstancesBaseURL: function () {
          return (
            this._getWorkflowRuntimeBaseURL() +
            "/task-instances/" +
            this.getTaskInstanceID()
          );
        },

        _getWorkflowRuntimeBaseURL: function () {
          var appId = this.getManifestEntry("/sap.app/id");
          var appPath = appId.replaceAll(".", "/");
          var appModulePath = jQuery.sap.getModulePath(appPath);

          return appModulePath + "/bpmworkflowruntime/v1";
        },

        getTaskInstanceID: function () {
          return this.getModel("task").getData().InstanceID;
        },

        getInboxAPI: function () {
          var startupParameters = this.getComponentData().startupParameters;
          return startupParameters.inboxAPI;
        },

        completeTask: function (approvalStatus) {
          this.getModel("context").setProperty("/approved", approvalStatus);
          this._patchTaskInstance();
          this._refreshTaskList();
        },

        _patchTaskInstance: function () {
          var data = {
            status: "COMPLETED",
            context: this.getModel("context").getData(),
          };

          jQuery.ajax({
            url: this._getTaskInstancesBaseURL(),
            method: "PATCH",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(data),
            headers: {
              "X-CSRF-Token": this._fetchToken(),
            },
          });
        },

        _fetchToken: function () {
          var fetchedToken;

          jQuery.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
            method: "GET",
            async: false,
            headers: {
              "X-CSRF-Token": "Fetch",
            },
            success(result, xhr, data) {
              fetchedToken = data.getResponseHeader("X-CSRF-Token");
            },
          });
          return fetchedToken;
        },

        _refreshTaskList: function () {
          this.getInboxAPI().updateTask("NA", this.getTaskInstanceID());
        },

        /**
       * Handler for showing Action dialog .
       * @public
       */
        onShowActionDialog: function () {
          const oView = this.getRootControl();
          this.getModel("context").setProperty("/comments", "");
          let oTextArea = ""
          if (!oView.byId("userActionDialog")) {
            Fragment.load({
              id: oView.getId(),
              name: "wasteManagement.workflowuimodule.fragment.comments",
              controller: this,
            }).then(
              function (oDialog) {
                oView.addDependent(oDialog);
                oTextArea = oDialog.getContent()[0].getContent()[1];
                oTextArea.setValueState("None");
                oTextArea.setValueStateText("");
                oDialog.open();
              }.bind(this)
            );
          } else {
            oTextArea = oView.byId("userActionDialog").getContent()[0].getContent()[1];
            oTextArea.setValueState("None");
            oTextArea.setValueStateText("");
            oView.byId("userActionDialog").open();
          }
        },

        /**
        * Handler for confirming Action dialog .
        * @public
        */
        onConfirmUserActionDialog: function (oEvent) {
          const oSource = oEvent.getSource();
          const oDialog = oSource.getParent();
          const sDialogTitle = oDialog.getTitle();
          const oModel = this.getModel("context");
          const oTextArea = oDialog.getContent()[0].getContent()[1];
          let bFileUploaded = "";
          // const oDetailSectionModel = this.getModel("DetailSection");
          // const bSupportGroup = oDetailSectionModel.getProperty("/bSupportGroup");
          let sMandatoryDocUpload = this.oI18n.getText("msgValueStateDocMandatoryField");
          let sValueStateSpecialCharsMsg = this.oI18n.getText("msgValueStateSpecialChars");
          let sValueStateMandatoryMsg = this.oI18n.getText("msgValueStateMandatoryFields");
          oTextArea.setValueStateText("");
          let regex = new RegExp(/[^A-Za-z0-9\-\_\.\,\$\s]/);
          let bInValidComments = false;
          // bInValidComments = regex.test(oTextArea.getValue());
          if (!bInValidComments) {
            oTextArea.setValueState("None");
            oTextArea.setValueStateText("");
            oModel.setProperty("/approverDecision", "REJECT");
            oDialog.close();
            let s1 = oModel.getProperty("/comments");
            let sFormattedComments = btoa(s1);
            oModel.setProperty("/comments", sFormattedComments);
            this.completeTask(false);
          } else {
            oTextArea.setValueState("Error");
            oTextArea.setValueStateText(sValueStateSpecialCharsMsg);
          }
        },
        /**
         * Handler to close Action dialog .
         * @public
         */
        onCloseUserActionDialog: function (oEvent) {
          this.getModel("context").setProperty("/comments", "");
          oEvent.getSource().getParent().close();
        },

        /**
                  * lifecycle, on after rendering
                  * initialize resource bundle
                  * @public
                  */
        onAfterRendering: function () {
          this.oI18n = this.getModel("i18n").getResourceBundle();
        },

      }
    );
  }
);

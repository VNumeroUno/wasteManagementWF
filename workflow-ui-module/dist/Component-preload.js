//@ui5-bundle wasteManagement/workflowuimodule/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"wasteManagement/workflowuimodule/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","wasteManagement/workflowuimodule/model/models","sap/m/Dialog","sap/m/DialogType","sap/m/Button","sap/m/ButtonType","sap/m/Label","sap/m/MessageBox","sap/m/MessageToast","sap/m/Text","sap/m/TextArea","sap/ui/core/Core","sap/m/upload/UploadSet","sap/ui/core/Fragment","sap/ui/unified/FileUploaderParameter","sap/m/library"],function(e,t,s,n,o,a,i,r,l,c,u,p,g,d,h,m,f){"use strict";return e.extend("wasteManagement.workflowuimodule.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(s.createDeviceModel(),"device");this.setTaskModels();this.getInboxAPI().addAction({action:"APPROVE",label:"Approve",type:"accept"},function(){this.completeTask(true)},this);this.getInboxAPI().addAction({action:"REJECT",label:"Reject",type:"reject"},function(){this.onShowActionDialog()},this)},setTaskModels:function(){var e=this.getComponentData().startupParameters;this.setModel(e.taskModel,"task");var t=new sap.ui.model.json.JSONModel(this._getTaskInstancesBaseURL()+"/context");this.setModel(t,"context")},_getTaskInstancesBaseURL:function(){return this._getWorkflowRuntimeBaseURL()+"/task-instances/"+this.getTaskInstanceID()},_getWorkflowRuntimeBaseURL:function(){var e=this.getManifestEntry("/sap.app/id");var t=e.replaceAll(".","/");var s=jQuery.sap.getModulePath(t);return s+"/bpmworkflowruntime/v1"},getTaskInstanceID:function(){return this.getModel("task").getData().InstanceID},getInboxAPI:function(){var e=this.getComponentData().startupParameters;return e.inboxAPI},completeTask:function(e){this.getModel("context").setProperty("/approved",e);this._patchTaskInstance();this._refreshTaskList()},_patchTaskInstance:function(){var e={status:"COMPLETED",context:this.getModel("context").getData()};jQuery.ajax({url:this._getTaskInstancesBaseURL(),method:"PATCH",contentType:"application/json",async:false,data:JSON.stringify(e),headers:{"X-CSRF-Token":this._fetchToken()}})},_fetchToken:function(){var e;jQuery.ajax({url:this._getWorkflowRuntimeBaseURL()+"/xsrf-token",method:"GET",async:false,headers:{"X-CSRF-Token":"Fetch"},success(t,s,n){e=n.getResponseHeader("X-CSRF-Token")}});return e},_refreshTaskList:function(){this.getInboxAPI().updateTask("NA",this.getTaskInstanceID())},onShowActionDialog:function(){const e=this.getRootControl();this.getModel("context").setProperty("/comments","");let t="";if(!e.byId("userActionDialog")){h.load({id:e.getId(),name:"wasteManagement.workflowuimodule.fragment.comments",controller:this}).then(function(s){e.addDependent(s);t=s.getContent()[0].getContent()[1];t.setValueState("None");t.setValueStateText("");s.open()}.bind(this))}else{t=e.byId("userActionDialog").getContent()[0].getContent()[1];t.setValueState("None");t.setValueStateText("");e.byId("userActionDialog").open()}},onConfirmUserActionDialog:function(e){const t=e.getSource();const s=t.getParent();const n=s.getTitle();const o=this.getModel("context");const a=s.getContent()[0].getContent()[1];let i="";let r=this.oI18n.getText("msgValueStateDocMandatoryField");let l=this.oI18n.getText("msgValueStateSpecialChars");let c=this.oI18n.getText("msgValueStateMandatoryFields");a.setValueStateText("");let u=new RegExp(/[^A-Za-z0-9\-\_\.\,\$\s]/);let p=false;if(!p){a.setValueState("None");a.setValueStateText("");o.setProperty("/approverDecision","REJECT");s.close();let e=o.getProperty("/comments");let t=btoa(e);o.setProperty("/comments",t);this.completeTask(false)}else{a.setValueState("Error");a.setValueStateText(l)}},onCloseUserActionDialog:function(e){this.getModel("context").setProperty("/comments","");e.getSource().getParent().close()},onAfterRendering:function(){this.oI18n=this.getModel("i18n").getResourceBundle()}})});
},
	"wasteManagement/workflowuimodule/controller/wasteManagement.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("wasteManagement.workflowuimodule.controller.wasteManagement",{onInit:function(){}})});
},
	"wasteManagement/workflowuimodule/fragment/comments.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.ui.layout.form" xmlns:u="sap.ui.unified"><Dialog id="userActionDialog" class="sapUiSizeCompact" busy="false"  contentWidth="500px" title="{i18n>labelAddComments}" busyIndicatorDelay="0"><content><f:SimpleForm editable="true" layout="ResponsiveGridLayout" labelSpanXL="3" labelSpanL="3" labelSpanM="3"  adjustLabelSpan="false" emptySpanXL="4" emptySpanL="4" emptySpanM="4" emptySpanS="0" columnsXL="1" columnsL="1" columnsM="1" singleContainerFullSize="false"><f:content><Label text="{i18n>labelAddComments} " required="true" /><TextArea  value="{context>/comments}" width="100%" valueState="{=${context>/comments} ? \'None\':\'Error\'}"/></f:content></f:SimpleForm></content><beginButton><Button text="{i18n>labelBtnOK}" type="Emphasized" press=".onConfirmUserActionDialog"/></beginButton><endButton><Button text="{i18n>labelBtnCancel}" press=".onCloseUserActionDialog" /></endButton></Dialog></core:FragmentDefinition>',
	"wasteManagement/workflowuimodule/i18n/i18n.properties":'# This is the resource bundle for wasteManagement.workflowuimodule\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Waste Management\n\n#YDES: Application description\nappDescription=A workflow task UI application\n#XTIT: Main view title\ntitle=Waste Management\nconfirmMsgTitleSystemDelete=Are you sure you want to delete the below System?\ndisplaySuccessMsgDeleteConfirmation=Selected Item(s) added to deleted List.\nconfirmMsgTitleDeleteDialog=Are you sure you want to delete?\nmsgConfirmationUnsavedChanges=All your unsaved changes will be saved.\ntitleConfirmationUnsaved=Unsaved Changes\n\n#fragment.ActionDialog\nlabelAddComments=Please add comments\nlabelDetails=Details\nlabelBtnOK=OK\nlabelBtnCancel=Cancel\nlabelBtnUploadSupportingDocument=Upload Supporting Document\n#fragment.FileUploadDialog\ntitleFileUploadDialog=Upload your document\nplaceholderAttachments=Attach your file\n\n#fragment.RequestInfoActionDialog\ntitleReqInfoDialog=Request more information\n\nmsgSuccessAssetmanageCommentsUpdate= Asset Management Comments updated succesfully.\nmsgErrorAssetmanageCommentsUpdate=Asset Management Comments update failed.\nmsgSuccessAttachmentUpload=Supporting document uploaded succesfully.\nmsgErrorAttachmentUpload=Supporting document upload failed.\nmsgValueStateSpecialChars=Only Special characters (`.` , `$` and `,`) are allowed.\nmsgValueStateMandatoryFields=Mandatory Field missing.\nmsgValueStateDocMandatoryField=Upload Supporting Document.\n\n\n#Approvals\n\ntitleApprovers=Approvers\ntableColumnApprovalsApprover=Approver\ntableColumnApprovalsStatus=Status\ntableColumnApprovalsComments=Comments\t\ntableColumnApprovalsSupportingDocument=Supporting Document\t\ntableColumnApprovalsCompletedBy=Completed By\ntableColumnApprovalsStarted=Started\ntableColumnApprovalsCompleted=Completed\n\nlabelBtnApprove=Approve\nlabelBtnReject=Reject\nlabelBtnReqInfo=Request Info\nlabelBtnResend=Resend\ntitleConfirmationRejectTransaction=Do you want to reject this transaction?\ntitleConfirmationApproveTransaction=Do you want to approve this transaction?\ntitleSaveAssetManagementComments=Save Asset Management Comments\ntitleConfirmationSaveComments=Do you want to save Asset Management Comments?\nmsgFailAssetmanageCommentsUpdate=Asset Management Update Failed.Please try again.',
	"wasteManagement/workflowuimodule/manifest.json":'{"_version":"1.26.0","sap.app":{"id":"wasteManagement.workflowuimodule","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.8.4","toolsId":"97ee5048-45e5-4534-8022-600200cd8550"},"dataSources":{"mainService":{"uri":"sap/opu/odata/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.82.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"wasteManagement.workflowuimodule.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"wasteManagement.workflowuimodule.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RoutewasteManagement","pattern":":?query:","target":["TargetwasteManagement"]}],"targets":{"TargetwasteManagement":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"wasteManagement","viewName":"wasteManagement"}}},"rootView":{"viewName":"wasteManagement.workflowuimodule.view.wasteManagement","type":"XML","async":true,"id":"wasteManagement"}},"sap.cloud":{"public":true,"service":"cprailinbox"}}',
	"wasteManagement/workflowuimodule/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"wasteManagement/workflowuimodule/utils/locate-reuse-libs.js":'(function(e){var t=function(e,t){var n=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];Object.keys(e).forEach(function(e){if(!n.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t};var n=function(e){var n="";if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=t(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=t(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=t(e["sap.ui5"].componentUsages,n)}}return n};var r=function(e){var t=e;return new Promise(function(r,a){$.ajax(t).done(function(e){r(n(e))}).fail(function(){a(new Error("Could not fetch manifest at \'"+e))})})};var a=function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}};e.registerComponentDependencyPaths=function(e){return r(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(a)}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");var bundleResources=function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")};sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(bundleResources);if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(bundleResources)}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"wasteManagement/workflowuimodule/view/wasteManagement.view.xml":'<mvc:View controllerName="wasteManagement.workflowuimodule.controller.wasteManagement" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><App id="app"><pages><Page showHeader="false" showFooter="false"><content><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Select the Countries/Area will be supplying data: " /><Text text="{context>/reportingCountry}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Reporting Year: " /><Text text="{context>/reportingYear}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Start Date of Reporting Year: " /><Text text="{context>/startDate}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="End Date of Reporting Year: " /><Text text="{context>/endDate}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Amount of hazardous waste from manufacturing in Metric tons: " /><Text text="{context>/totalWastageFromManufacturing}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Percentage Recycled in Percentage: " /><Text text="{context>/totalRecycledWastage}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Data Owner: " /><Text text="{task>/CreatedByName}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Additional Reporter: " /><Text text="Christopher Tam, Nidhideep Bhandari" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Reporting Country: " /><Text text="{context>/reportingCountry}" /></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="Comments: " /><TextArea rows="5" cols="100" value="{context>/Comments}" editable="true"/></HBox><HBox alignItems="Center" class="sapUiSmallMarginTop sapUiSmallMarginBegin"><Text class="sapUiSmallMarginEnd" text="To be approved by: " /><Text text="{context>/approvers}" /></HBox><Button text="Download Attachment" icon="sap-icon://download" class="sapUiSmallMarginTop sapUiSmallMarginBegin sapUiSmallMarginEnd" /></content></Page></pages></App></mvc:View>\n'
}});

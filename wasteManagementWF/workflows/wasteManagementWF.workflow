{
	"contents": {
		"7c767a2f-6094-496a-a231-ce29f3bec53c": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "cis.wastemanagementwf",
			"subject": "Waste management",
			"name": "wasteManagementWF",
			"documentation": "Waste Management Workflow",
			"lastIds": "62d7f4ed-4063-4c44-af8b-39050bd44926",
			"events": {
				"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
					"name": "Report Submitted"
				},
				"1e5ce93b-d212-42be-a086-4c380ae231b3": {
					"name": "Completed"
				}
			},
			"activities": {
				"c69daaa7-ac82-4e61-a066-92ef8ef9d96a": {
					"name": "Waste Management"
				},
				"a5de9066-a38c-480b-801b-1c9d0b0605f7": {
					"name": "ScriptTask1"
				},
				"b10e5403-d11f-4c26-961f-eb755b80fe44": {
					"name": "ServiceTask1"
				},
				"6dd396b9-8ac3-4775-ae6a-f644a5f26ef7": {
					"name": "ExclusiveGateway3"
				},
				"d99bdf8c-e0dd-4db1-8a54-72ac6f691f5e": {
					"name": "Review waste details"
				}
			},
			"sequenceFlows": {
				"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
					"name": "SequenceFlow1"
				},
				"072f1730-2953-40c4-a65c-1fdbb0594144": {
					"name": "SequenceFlow15"
				},
				"53af2bbf-0e8b-4a88-90cb-36894227c966": {
					"name": "SequenceFlow16"
				},
				"5ce68b73-b101-4455-82fc-9f5636a954a2": {
					"name": "SequenceFlow19"
				},
				"0be42943-af6c-4d07-ba46-45cc76c38364": {
					"name": "Approve"
				},
				"b155e14c-f2ad-46bc-9e98-2f709d5988a8": {
					"name": "Reject"
				},
				"0a846236-6f14-40b5-85ba-331453a10ead": {
					"name": "SequenceFlow23"
				}
			},
			"diagrams": {
				"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {}
			}
		},
		"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "Report Submitted"
		},
		"1e5ce93b-d212-42be-a086-4c380ae231b3": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent2",
			"name": "Completed"
		},
		"c69daaa7-ac82-4e61-a066-92ef8ef9d96a": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Approve-WasteManagement",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"supportsForward": false,
			"userInterface": "sapui5://cprailinbox.wasteManagementworkflowuimodule/wasteManagement.workflowuimodule",
			"recipientUsers": "${context.approvers}",
			"userInterfaceParams": [],
			"id": "usertask1",
			"name": "Waste Management"
		},
		"a5de9066-a38c-480b-801b-1c9d0b0605f7": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/wasteManagement_Workflow/payload.js",
			"id": "scripttask5",
			"name": "ScriptTask1"
		},
		"b10e5403-d11f-4c26-961f-eb755b80fe44": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "Emission_CAP",
			"destinationSource": "consumer",
			"path": "/WasteManagement",
			"httpMethod": "POST",
			"requestVariable": "${context.payload}",
			"responseVariable": "${context.result}",
			"id": "servicetask2",
			"name": "ServiceTask1"
		},
		"6dd396b9-8ac3-4775-ae6a-f644a5f26ef7": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway3",
			"name": "ExclusiveGateway3",
			"default": "0be42943-af6c-4d07-ba46-45cc76c38364"
		},
		"d99bdf8c-e0dd-4db1-8a54-72ac6f691f5e": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Review waste management",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"supportsForward": false,
			"userInterface": "sapui5://cprailinbox.wasteManagementworkflowuimodule/wasteManagement.workflowuimodule",
			"recipientUsers": "${context.approvers}",
			"id": "usertask6",
			"name": "Review waste details"
		},
		"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow1",
			"name": "SequenceFlow1",
			"sourceRef": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3",
			"targetRef": "c69daaa7-ac82-4e61-a066-92ef8ef9d96a"
		},
		"072f1730-2953-40c4-a65c-1fdbb0594144": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow15",
			"name": "SequenceFlow15",
			"sourceRef": "a5de9066-a38c-480b-801b-1c9d0b0605f7",
			"targetRef": "b10e5403-d11f-4c26-961f-eb755b80fe44"
		},
		"53af2bbf-0e8b-4a88-90cb-36894227c966": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow16",
			"name": "SequenceFlow16",
			"sourceRef": "b10e5403-d11f-4c26-961f-eb755b80fe44",
			"targetRef": "1e5ce93b-d212-42be-a086-4c380ae231b3"
		},
		"5ce68b73-b101-4455-82fc-9f5636a954a2": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow19",
			"name": "SequenceFlow19",
			"sourceRef": "c69daaa7-ac82-4e61-a066-92ef8ef9d96a",
			"targetRef": "6dd396b9-8ac3-4775-ae6a-f644a5f26ef7"
		},
		"0be42943-af6c-4d07-ba46-45cc76c38364": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow21",
			"name": "Approve",
			"sourceRef": "6dd396b9-8ac3-4775-ae6a-f644a5f26ef7",
			"targetRef": "a5de9066-a38c-480b-801b-1c9d0b0605f7"
		},
		"b155e14c-f2ad-46bc-9e98-2f709d5988a8": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.approved == false }",
			"id": "sequenceflow22",
			"name": "Reject",
			"sourceRef": "6dd396b9-8ac3-4775-ae6a-f644a5f26ef7",
			"targetRef": "d99bdf8c-e0dd-4db1-8a54-72ac6f691f5e"
		},
		"0a846236-6f14-40b5-85ba-331453a10ead": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow23",
			"name": "SequenceFlow23",
			"sourceRef": "d99bdf8c-e0dd-4db1-8a54-72ac6f691f5e",
			"targetRef": "1e5ce93b-d212-42be-a086-4c380ae231b3"
		},
		"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"df898b52-91e1-4778-baad-2ad9a261d30e": {},
				"6bb141da-d485-4317-93b8-e17711df4c32": {},
				"5a5fc51a-be5f-45d0-92f2-f424b4f58804": {},
				"0eef9843-5129-4c6c-ab41-49c805d72d76": {},
				"8fdfebde-a616-4fcf-9b16-1d8d055c99d0": {},
				"0b2de754-e31e-496a-93be-36fcb851c5de": {},
				"878cedcf-dc41-4fee-b55d-1c3c82ca19bd": {},
				"ef1dbc86-81c8-492d-bfdd-93b4509509d5": {},
				"597244f7-bdbd-4979-967f-9a7d33e3d241": {},
				"8f846718-4d8c-4fa3-96ee-25238bcb9618": {},
				"50844eb3-03c9-4a6d-9940-b7714417f367": {},
				"4c414a5f-ab97-4353-8402-aa008ab0aafc": {},
				"2613abb4-2426-4c38-af30-888bc750273c": {},
				"219cc183-9b97-4b8c-8470-bbac996997f4": {}
			}
		},
		"df898b52-91e1-4778-baad-2ad9a261d30e": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 59,
			"y": 93,
			"width": 32,
			"height": 32,
			"object": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3"
		},
		"6bb141da-d485-4317-93b8-e17711df4c32": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "75,108.71562576293945 202.24147033691406,108.71562576293945",
			"sourceSymbol": "df898b52-91e1-4778-baad-2ad9a261d30e",
			"targetSymbol": "5a5fc51a-be5f-45d0-92f2-f424b4f58804",
			"object": "c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f"
		},
		"5a5fc51a-be5f-45d0-92f2-f424b4f58804": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"isAdjustToContent": false,
			"x": 164.24147286593848,
			"y": 92.75,
			"width": 76,
			"height": 31,
			"object": "c69daaa7-ac82-4e61-a066-92ef8ef9d96a"
		},
		"0eef9843-5129-4c6c-ab41-49c805d72d76": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 435.085205078125,
			"y": 186.875,
			"width": 100,
			"height": 60,
			"object": "a5de9066-a38c-480b-801b-1c9d0b0605f7"
		},
		"8fdfebde-a616-4fcf-9b16-1d8d055c99d0": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 668.085205078125,
			"y": 186.875,
			"width": 100,
			"height": 60,
			"object": "b10e5403-d11f-4c26-961f-eb755b80fe44"
		},
		"0b2de754-e31e-496a-93be-36fcb851c5de": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "485.085205078125,216.875 718.085205078125,216.875",
			"sourceSymbol": "0eef9843-5129-4c6c-ab41-49c805d72d76",
			"targetSymbol": "8fdfebde-a616-4fcf-9b16-1d8d055c99d0",
			"object": "072f1730-2953-40c4-a65c-1fdbb0594144"
		},
		"878cedcf-dc41-4fee-b55d-1c3c82ca19bd": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 797.085205078125,
			"y": 40.375,
			"width": 35,
			"height": 35,
			"object": "1e5ce93b-d212-42be-a086-4c380ae231b3"
		},
		"ef1dbc86-81c8-492d-bfdd-93b4509509d5": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "717.835205078125,216.875 717.835205078125,130.875 814.835205078125,130.875 814.835205078125,57.875",
			"sourceSymbol": "8fdfebde-a616-4fcf-9b16-1d8d055c99d0",
			"targetSymbol": "878cedcf-dc41-4fee-b55d-1c3c82ca19bd",
			"object": "53af2bbf-0e8b-4a88-90cb-36894227c966"
		},
		"597244f7-bdbd-4979-967f-9a7d33e3d241": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 285.7414728659385,
			"y": 82.25,
			"object": "6dd396b9-8ac3-4775-ae6a-f644a5f26ef7"
		},
		"8f846718-4d8c-4fa3-96ee-25238bcb9618": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "202.24147286593848,105.75 306.7414728659385,105.75",
			"sourceSymbol": "5a5fc51a-be5f-45d0-92f2-f424b4f58804",
			"targetSymbol": "597244f7-bdbd-4979-967f-9a7d33e3d241",
			"object": "5ce68b73-b101-4455-82fc-9f5636a954a2"
		},
		"50844eb3-03c9-4a6d-9940-b7714417f367": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "327.2414728659385,103.25 381.413330078125,103.25 381.413330078125,216.875 435.585205078125,216.875",
			"sourceSymbol": "597244f7-bdbd-4979-967f-9a7d33e3d241",
			"targetSymbol": "0eef9843-5129-4c6c-ab41-49c805d72d76",
			"object": "0be42943-af6c-4d07-ba46-45cc76c38364"
		},
		"4c414a5f-ab97-4353-8402-aa008ab0aafc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "306.7414728659385,103.25 399.8707275390625,103.25 399.8707275390625,2 522,2",
			"sourceSymbol": "597244f7-bdbd-4979-967f-9a7d33e3d241",
			"targetSymbol": "2613abb4-2426-4c38-af30-888bc750273c",
			"object": "b155e14c-f2ad-46bc-9e98-2f709d5988a8"
		},
		"2613abb4-2426-4c38-af30-888bc750273c": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 472,
			"y": -28,
			"width": 100,
			"height": 60,
			"object": "d99bdf8c-e0dd-4db1-8a54-72ac6f691f5e"
		},
		"219cc183-9b97-4b8c-8470-bbac996997f4": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "522,2 684.7926025390625,2 684.7926025390625,57.875 814.585205078125,57.875",
			"sourceSymbol": "2613abb4-2426-4c38-af30-888bc750273c",
			"targetSymbol": "878cedcf-dc41-4fee-b55d-1c3c82ca19bd",
			"object": "0a846236-6f14-40b5-85ba-331453a10ead"
		},
		"62d7f4ed-4063-4c44-af8b-39050bd44926": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"sequenceflow": 23,
			"startevent": 1,
			"endevent": 3,
			"usertask": 6,
			"servicetask": 2,
			"scripttask": 5,
			"exclusivegateway": 3,
			"parallelgateway": 1
		}
	}
}
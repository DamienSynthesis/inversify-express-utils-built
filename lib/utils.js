"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var constants_2 = require("./constants");
function getControllersFromContainer(container, forceControllers) {
    if (container.isBound(constants_2.TYPE.Controller)) {
        return container.getAll(constants_2.TYPE.Controller);
    }
    else if (forceControllers) {
        throw new Error(constants_1.NO_CONTROLLERS_FOUND);
    }
    else {
        return [];
    }
}
exports.getControllersFromContainer = getControllersFromContainer;
function getControllersFromMetadata() {
    var arrayOfControllerMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, Reflect) || [];
    return arrayOfControllerMetadata.map(function (metadata) { return metadata.target; });
}
exports.getControllersFromMetadata = getControllersFromMetadata;
function getControllerMetadata(constructor) {
    var controllerMetadata = Reflect.getOwnMetadata(constants_1.METADATA_KEY.controller, constructor);
    return controllerMetadata;
}
exports.getControllerMetadata = getControllerMetadata;
function getControllerMethodMetadata(constructor) {
    var methodMetadata = Reflect.getOwnMetadata(constants_1.METADATA_KEY.controllerMethod, constructor);
    var genericMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controllerMethod, Reflect.getPrototypeOf(constructor));
    if (genericMetadata !== undefined && methodMetadata !== undefined) {
        return methodMetadata.concat(genericMetadata);
    }
    else if (genericMetadata !== undefined) {
        return genericMetadata;
    }
    else {
        return methodMetadata;
    }
}
exports.getControllerMethodMetadata = getControllerMethodMetadata;
function getControllerParameterMetadata(constructor) {
    var parameterMetadata = Reflect.getOwnMetadata(constants_1.METADATA_KEY.controllerParameter, constructor);
    var genericMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controllerParameter, Reflect.getPrototypeOf(constructor));
    if (genericMetadata !== undefined && parameterMetadata !== undefined) {
        return __assign({}, parameterMetadata, genericMetadata);
    }
    else if (genericMetadata !== undefined) {
        return genericMetadata;
    }
    else {
        return parameterMetadata;
    }
}
exports.getControllerParameterMetadata = getControllerParameterMetadata;
function cleanUpMetadata() {
    Reflect.defineMetadata(constants_1.METADATA_KEY.controller, [], Reflect);
}
exports.cleanUpMetadata = cleanUpMetadata;
function instanceOfIHttpActionResult(value) {
    return value != null && typeof value.executeAsync === "function";
}
exports.instanceOfIHttpActionResult = instanceOfIHttpActionResult;

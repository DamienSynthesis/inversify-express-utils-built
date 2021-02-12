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
import { METADATA_KEY, NO_CONTROLLERS_FOUND } from "./constants";
import { TYPE } from "./constants";
export function getControllersFromContainer(container, forceControllers) {
    if (container.isBound(TYPE.Controller)) {
        return container.getAll(TYPE.Controller);
    }
    else if (forceControllers) {
        throw new Error(NO_CONTROLLERS_FOUND);
    }
    else {
        return [];
    }
}
export function getControllersFromMetadata() {
    var arrayOfControllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];
    return arrayOfControllerMetadata.map(function (metadata) { return metadata.target; });
}
export function getControllerMetadata(constructor) {
    var controllerMetadata = Reflect.getOwnMetadata(METADATA_KEY.controller, constructor);
    return controllerMetadata;
}
export function getControllerMethodMetadata(constructor) {
    var methodMetadata = Reflect.getOwnMetadata(METADATA_KEY.controllerMethod, constructor);
    var genericMetadata = Reflect.getOwnMetadata(METADATA_KEY.controllerMethod, Reflect.getPrototypeOf(constructor));
    if (genericMetadata !== undefined && methodMetadata !== undefined) {
        return methodMetadata.concat(genericMetadata);
    }
    else {
        return methodMetadata;
    }
}
export function getControllerParameterMetadata(constructor) {
    var parameterMetadata = Reflect.getOwnMetadata(METADATA_KEY.controllerParameter, constructor);
    var genericMetadata = Reflect.getOwnMetadata(METADATA_KEY.controllerParameter, Reflect.getPrototypeOf(constructor));
    if (genericMetadata !== undefined && parameterMetadata !== undefined) {
        return __assign({}, parameterMetadata, genericMetadata);
    }
    else {
        return parameterMetadata;
    }
}
export function cleanUpMetadata() {
    Reflect.defineMetadata(METADATA_KEY.controller, [], Reflect);
}
export function instanceOfIHttpActionResult(value) {
    return value != null && typeof value.executeAsync === "function";
}

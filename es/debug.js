import { PARAMETER_TYPE } from "./constants";
import { getControllersFromContainer, getControllerMetadata, getControllerMethodMetadata, getControllerParameterMetadata } from "./utils";
export function getRouteInfo(container) {
    var raw = getRawMetadata(container);
    return raw.map(function (r) {
        var controllerId = r.controllerMetadata.target.name;
        var endpoints = r.methodMetadata.map(function (m) {
            var method = m.method.toUpperCase();
            var controllerPath = r.controllerMetadata.path;
            var actionPath = m.path;
            var paramMetadata = r.parameterMetadata;
            var args = undefined;
            if (paramMetadata !== undefined) {
                var paramMetadataForKey = paramMetadata[m.key] || undefined;
                if (paramMetadataForKey) {
                    args = (r.parameterMetadata[m.key] || []).map(function (a) {
                        var type = "";
                        switch (a.type) {
                            case PARAMETER_TYPE.RESPONSE:
                                type = "@response";
                                break;
                            case PARAMETER_TYPE.REQUEST:
                                type = "@request";
                                break;
                            case PARAMETER_TYPE.NEXT:
                                type = "@next";
                                break;
                            case PARAMETER_TYPE.PARAMS:
                                type = "@requestParam";
                                break;
                            case PARAMETER_TYPE.QUERY:
                                type = "queryParam";
                                break;
                            case PARAMETER_TYPE.BODY:
                                type = "@requestBody";
                                break;
                            case PARAMETER_TYPE.HEADERS:
                                type = "@requestHeaders";
                                break;
                            case PARAMETER_TYPE.COOKIES:
                                type = "@cookies";
                                break;
                            case PARAMETER_TYPE.PRINCIPAL:
                                type = "@principal";
                                break;
                        }
                        return type + " " + a.parameterName;
                    });
                }
            }
            var details = {
                route: method + " " + controllerPath + actionPath
            };
            if (args) {
                details["args"] = args;
            }
            return details;
        });
        return {
            controller: controllerId,
            endpoints: endpoints
        };
    });
}
export function getRawMetadata(container) {
    var controllers = getControllersFromContainer(container, true);
    return controllers.map(function (controller) {
        var constructor = controller.constructor;
        var controllerMetadata = getControllerMetadata(constructor);
        var methodMetadata = getControllerMethodMetadata(constructor);
        var parameterMetadata = getControllerParameterMetadata(constructor);
        return {
            controllerMetadata: controllerMetadata,
            methodMetadata: methodMetadata,
            parameterMetadata: parameterMetadata
        };
    });
}

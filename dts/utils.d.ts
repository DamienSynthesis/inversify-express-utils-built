import { interfaces as inversifyInterfaces } from "inversify";
import { interfaces } from "./interfaces";
export declare function getControllersFromContainer(container: inversifyInterfaces.Container, forceControllers: boolean): interfaces.Controller[];
export declare function getControllersFromMetadata(): any[];
export declare function getControllerMetadata(constructor: any): interfaces.ControllerMetadata;
export declare function getControllerMethodMetadata(constructor: any): any;
export declare function getControllerParameterMetadata(constructor: any): interfaces.ControllerParameterMetadata;
export declare function cleanUpMetadata(): void;
export declare function instanceOfIHttpActionResult(value: any): value is interfaces.IHttpActionResult;

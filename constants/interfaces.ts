import { MutableRefObject, RefObject } from "react";
import { ToolType } from "./enums";

export interface DrawingAreaInterface {
    drawingAreaRef: RefObject<HTMLCanvasElement>
}

export interface IconsInterface {
    iconName: string
}

export interface ToolMouseEnterInterface {
    submenu: {
    vector: string;
    name: string;
    value: string;
    }[] | undefined,
    name: string
}

export interface ToolPropsInterface {
    clickHandler: (type: ToolType, name: string) => void,
    valueProp: string,
    toolType: ToolType,
    submenu: { vector: string; name: string; value: string;}[] | undefined,
    name: string,
    mouseEnterHandler: ({ submenu, name }: ToolMouseEnterInterface) => void,
    mouseLeaveHandler: (submenu: {vector: string; name: string; value: string;}[] | undefined) => void,
    children: any
}
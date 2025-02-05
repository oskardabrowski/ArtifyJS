import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { ToolType } from "./enums";
import { ToolManager } from "./toolsManager";

export interface DrawingInterface {
    drawingAreaRef: RefObject<HTMLCanvasElement>
}

export interface ToolNameInterface {
    setToolName: Dispatch<SetStateAction<string | null>>
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

export interface BezierLinePoint {
    x: number,
    y: number
    type: string,
    modifier: boolean
}

export interface Tool {
  vector: string;
  name: string;
  value: string;
  submenu?: { vector: string; name: string; value: string; }[];
}
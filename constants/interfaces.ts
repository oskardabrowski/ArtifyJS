import { MutableRefObject, RefObject } from "react";

export interface DrawingAreaInterface {
    drawingAreaRef: RefObject<HTMLCanvasElement>
}

export interface IconsInterface {
    iconName: string
}
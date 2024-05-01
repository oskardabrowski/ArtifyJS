import { Canvas } from "fabric/fabric-impl";
import { RectangleTool } from "./tools/rectangleTool";

export class ToolManager {
    drawingAreaRef: Canvas | null = null;
    rect: RectangleTool | null = null;

    constructor(drawingCanvas: Canvas | null, rect: RectangleTool | null) {
        this.drawingAreaRef = drawingCanvas;
        this.rect = rect;
    }

    // super() {}

    // initializeTools() {
    //     const rect = new RectangleTool(this.drawingAreaRef);
    //     rect.init();
    //     this.rect = rect;
    //     // rect.start();
    // }

    startSelectedTool(toolName: string) {
        console.log(toolName)
        console.log(this.rect)
        switch(toolName) {
            case 'rect': this.rect?.start(); break;
            default: return;
        }
    }
}
import { Canvas } from "fabric/fabric-impl";
import { RectangleTool } from "./tools/rectangleTool";

export class ToolManager {
    drawingAreaRef: Canvas | null = null;
    rect: RectangleTool | null = null;

    constructor(drawingCanvas: Canvas | null) {
        this.drawingAreaRef = drawingCanvas;
    }

    initializeTools() {
        const rect = new RectangleTool(this.drawingAreaRef);
        rect.init();
        this.rect = rect;
    }

    startSelectedTool(toolName: string | null) {
        switch(toolName) {
            case 'rect': this.rect?.start(); break;
            default: return;
        }
    }
}
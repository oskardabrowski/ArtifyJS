import { Canvas } from "fabric/fabric-impl";
import { RectangleTool } from "./tools/rectangleTool";
import { CircleTool } from "./tools/circleTool";

export class ToolManager {
    drawingAreaRef: Canvas | null = null;
    rect: RectangleTool | null = null;
    circle: CircleTool | null = null;

    constructor(drawingCanvas: Canvas | null) {
        this.drawingAreaRef = drawingCanvas;
    }

    initializeTools() {
        const rect = new RectangleTool(this.drawingAreaRef);
        rect.init();
        this.rect = rect;

        const circle = new CircleTool(this.drawingAreaRef);
        circle.init();
        this.circle = circle;
    }

    startSelectedTool(toolName: string | null) {
        switch(toolName) {
            case 'rect': this.rect?.start(); break;
            case 'circle': this.circle?.start(); break;
            default: return;
        }
    }
}
import { Canvas } from "fabric/fabric-impl";
import { RectangleTool } from "./tools/rectangleTool";
import { EllipseTool } from "./tools/ellipseTool";
import { TriangleTool } from "./tools/triangleTool";
import { ZoomTool } from "./tools/zoomTool";
import { PanTool } from "./tools/panTool";
import { PenTool } from "./tools/PenTool";

export class ToolManager {
    drawingAreaRef: Canvas | null = null;
    rect: RectangleTool | null = null;
    ellipse: EllipseTool | null = null;
    triangle: TriangleTool | null = null;
    pan: PanTool | null = null;
    pen: PenTool | null = null;

    constructor(drawingCanvas: Canvas | null) {
        this.drawingAreaRef = drawingCanvas;
    }

    initializeTools() {
        const rect = new RectangleTool(this.drawingAreaRef);
        rect.init();
        this.rect = rect;

        const ellipse = new EllipseTool(this.drawingAreaRef);
        ellipse.init();
        this.ellipse = ellipse;

        const triangle = new TriangleTool(this.drawingAreaRef);
        triangle.init();
        this.triangle = triangle;

        const zoom = new ZoomTool(this.drawingAreaRef);
        zoom.init();

        const pan = new PanTool(this.drawingAreaRef);
        pan.init();
        this.pan = pan;

        const pen = new PenTool(this.drawingAreaRef);
        pen.init();
        this.pen = pen;
    }

    startSelectedTool(toolName: string | null) {
        switch(toolName) {
            case 'rect': this.rect?.start(); break;
            case 'ellipse': this.ellipse?.start(); break;
            case 'triangle': this.triangle?.start(); break;
            case 'pan': this.pan?.start(); break;
            case 'pen': this.pen?.start(); break;
            default: return;
        }
    }
}
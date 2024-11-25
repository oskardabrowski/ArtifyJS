import { Tool } from "./tool";
import { Canvas } from "fabric/fabric-impl";
import { fabric } from 'fabric';
import { BezierLinePoint } from "../interfaces";

export class PenTool extends Tool {
    currentMousePoint: fabric.Circle | fabric.Rect | null = null;
    allMousePoints: any[] | [] = [];
    bezierLinePoints: BezierLinePoint[] | [] = [];
    bezierLineShape: fabric.Path | null = null;
    isMouseDown: boolean = false;
    mainGroup = new fabric.Group([], {
        left: 0,
        top: 0,
    });
    controlsGroup = new fabric.Group([], {});
    pathGroup = new fabric.Group([], {});
    constructor(editor: Canvas | null) {
        super(editor, '')
    }

    /*
     *
     * Override startDrawingOnMouseDown to create pen tool
     *
     */
    startDrawingOnMouseDown(e: any): void {
        if(this.isActive) {
            this.isDrawing = true;
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;
            this.isMouseDown = true;

            this.currentMousePoint = new fabric.Rect({
                width: 10,
                height: 10,
                left: this.x - 5,
                top: this.y - 5,
                fill: '#FFFFFF',
                stroke:'#0062BC',
                strokeWidth: 1,
                padding: 0,
                selectable: false,
            });

            const point: BezierLinePoint = {
                x: this.x,
                y: this.y,
            }

            this.allMousePoints = [...this.allMousePoints, this.currentMousePoint]

            this.bezierLinePoints = [...this.bezierLinePoints, point];

            if(this.currentMousePoint != null) {
                this.mainGroup.addWithUpdate(this.currentMousePoint);
                this.editor?.renderAll();

                if(this.bezierLinePoints.length > 1) {
                    this.createBezierLine();
                }
            }
        }
    }

    /*
     *
     * Method to create path, not completed yet
     *
     */
    createBezierLine() {
        let lowestX: number | null = null;
        let lowestY: number | null = null;

        let linePoints: { x: number; y: number; }[] | [] = [];

        this.bezierLinePoints.forEach((point) => {
            const {x, y}: BezierLinePoint = point;
            linePoints = [...linePoints, {x: x ,y: y}]

            if(lowestX === null || lowestX > x) {
                lowestX = x;
            }
            if(lowestY === null || lowestY > y) {
                lowestY = y;
            }
        });

        if(this.bezierLineShape != null) this.mainGroup.remove(this.bezierLineShape);

        if(lowestX != null && lowestY != null) {
            const firstPoint = linePoints[0];

            let zeroPoint = {
                x: linePoints[0].x,
                y: linePoints[0].y,
            };

            linePoints.map((point) => {
                if (zeroPoint.x < point.x) zeroPoint.x = point.x;
                if (zeroPoint.y < point.y) zeroPoint.y = point.y;
            });

            const mPoint = {
                x: firstPoint.x - zeroPoint.x,
                y: firstPoint.y - zeroPoint.y
            }

            let LineString = `M ${mPoint.x},${mPoint.y} L `;
            // let LineString = `M 0,0 L `;

            linePoints.filter((point, index) => {
                if(index > 0) {
                    LineString += `${point.x - zeroPoint.x},${point.y - zeroPoint.y} `;
                }
            });

            // "M 50,150 C 150,50 300,250 350,100 "

            this.bezierLineShape = new fabric.Path(LineString, {
              strokeWidth: 6,
              stroke: '#2563EB',
              fill: 'transparent',
              padding: 0,
            });

            this.bezierLineShape.set({
              left: this.bezierLineShape.left! - this.bezierLineShape.pathOffset.x - 1.25,
              top: this.bezierLineShape.top! - this.bezierLineShape.pathOffset.y - 1.25
            });

            this.mainGroup.insertAt(this.bezierLineShape, 0, false);
            this.editor?.renderAll();
        }
    }

    /*
     *
     * Initialize tool
     *
     */
    init() {
        const startDrawing = this.startDrawingOnMouseDown.bind(this);
        const holdingShift = this.shiftDownHandler.bind(this);
        const upShift = this.shiftUpHandler.bind(this);
        this.editor?.on("mouse:down", (e) => startDrawing(e));
        window.addEventListener('keydown', (e) => holdingShift(e));
        window.addEventListener('keyup', (e) => upShift(e));
    }

    start() {
        if(this.isActive) {
            this.stop()
        } else {
            this.editor?.add(this.mainGroup);
            this.editor!.selection = false;
            this.isActive = true;
            this.blockObjectsWhileDrawing();
        }
    }

    stop() {
        this.editor!.selection = true;
        this.isActive = false;
        this.isHoldingShift = false;
        this.unblockObjectsAfterDrawing();
    }
}
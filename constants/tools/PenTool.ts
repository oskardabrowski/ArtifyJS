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
    constructor(editor: Canvas | null) {
        super(editor, '')
    }

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
                console.info('Added');
                console.info(this.currentMousePoint);

                console.info(this.editor!.getZoom());
                this.editor?.add(this.currentMousePoint);
                this.editor?.renderAll();

                console.info(this.editor!.getObjects().indexOf(this.currentMousePoint));

                console.log(this.bezierLinePoints);

                if(this.bezierLinePoints.length > 1) {
                    this.createBezierLine();
                }

                // this.editor?.setActiveObject(shape);
                // this.stop();
            }
        }
    }

    createBezierLine() {
        let lowestX: number | null = null;
        let lowestY: number | null = null;

        console.log('Line started!');

        let linePoints: number[] | [] = [];

        this.bezierLinePoints.forEach((point) => {
            const {x, y}: BezierLinePoint = point;
            linePoints = [...linePoints, x ,y]

            if(lowestX === null || lowestX > x) {
                lowestX = x;
            }
            if(lowestY === null || lowestY > y) {
                lowestY = y;
            }
        });

        if(this.bezierLineShape != null) this.editor!.remove(this.bezierLineShape);

        if(lowestX != null && lowestY != null) {
            console.log('Line created!');
            console.log(linePoints);
            // this.bezierLineShape = new fabric.Line([...linePoints], {
            //     left: lowestX,
            //     top: lowestY,
            //     stroke: 'red'
            // });

            this.bezierLineShape = new fabric.Path("M 50,150 C 150,50 300,250 350,100 ", {
              strokeWidth: 6,
              stroke: "white",
              left: 10,
              top: 100,
            });

            this.editor?.add(this.bezierLineShape);
            this.editor?.renderAll();
        }


        // var line = new fabric.Line([50, 10, 200, 150], {
        //     stroke: 'green'
        // });

        // canvas.add(new fabric.Line([50, 100, 200, 200], {
        //     left: 170,
        //     top: 150,
        //     stroke: 'red'
        // }));


    }

    // continueDrawingOnMouseMove(e: any) {
    //     if(this.isActive) {
    //         if(!this.isDrawing) {
    //             return false;
    //         }

    //     }
    // }

    init() {
        const startDrawing = this.startDrawingOnMouseDown.bind(this);
        // const continueDrawing = this.continueDrawingOnMouseMove.bind(this);
        // const stopDrawing = this.stopDrawingOnMouseUp.bind(this);
        const holdingShift = this.shiftDownHandler.bind(this);
        const upShift = this.shiftUpHandler.bind(this);
        this.editor?.on("mouse:down", (e) => startDrawing(e));
        // this.editor?.on("mouse:move", (e) => continueDrawing(e));
        // this.editor?.on("mouse:up", () => stopDrawing());
        window.addEventListener('keydown', (e) => holdingShift(e));
        window.addEventListener('keyup', (e) => upShift(e));
    }

    start() {
        console.info('Started')
        this.editor!.selection = false;
        this.isActive = true;
    }

    stop() {
        this.editor!.selection = true;
        this.isActive = false;
        this.isHoldingShift = false;
    }
}
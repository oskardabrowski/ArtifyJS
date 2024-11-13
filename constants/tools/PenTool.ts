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
                this.mainGroup.addWithUpdate(this.currentMousePoint);
                // this.editor?.add(this.currentMousePoint);
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
            console.log('Line created!');
            console.log(linePoints);
            // this.bezierLineShape = new fabric.Line([...linePoints], {
            //     left: lowestX,
            //     top: lowestY,
            //     stroke: 'red'
            // });

            const firstPoint = linePoints[0];

            // let zeroPoint = {
            //     x: linePoints[0].x,
            //     y: linePoints[0].y,
            // };
            // let zeroPoint = {
            //     x: 0,
            //     y: 0,
            // };

            const mainGroupCoords = this.mainGroup.getCoords();

            console.log(mainGroupCoords)

            let zeroPoint = {
                x: linePoints[0].x,
                y: linePoints[0].y,
            };

            const topLeftPoint = {
                x: mainGroupCoords[0].x,
                y: mainGroupCoords[0].y,
            };

            const bottomRightPoint = {
                x: mainGroupCoords[2].x,
                y: mainGroupCoords[2].y,
            };

            const leftMargin = topLeftPoint.x - bottomRightPoint.x;
            const topMargin = topLeftPoint.y - bottomRightPoint.y;

            console.log(leftMargin);
            console.log(topMargin);



            linePoints.map((point) => {
                if (zeroPoint.x < point.x) zeroPoint.x = point.x;
                if (zeroPoint.y < point.y) zeroPoint.y = point.y;
            });

            const mPoint = {
                x: firstPoint.x - zeroPoint.x,
                y: firstPoint.y - zeroPoint.y
            }

            console.log(mPoint)

            let LineString = `M ${mPoint.x},${mPoint.y} L `;
            // let LineString = `M 0,0 L `;

            console.log(linePoints);

            linePoints.filter((point, index) => {
                if(index > 0) {
                    LineString += `${point.x - zeroPoint.x},${point.y - zeroPoint.y} `;
                }
            });

            // "M 50,150 C 150,50 300,250 350,100 "

            console.log(LineString)
            console.log(zeroPoint)

            this.bezierLineShape = new fabric.Path(LineString, {
              strokeWidth: 6,
              stroke: "blue",
            //   left: 0,
            //   top: 0,
            //   pathOffset: {x: 0, y: 0},
            //   left: zeroPoint.x - 2.5,
            //   top: zeroPoint.y - 2.5,
            //   left: zeroPoint.x - 2.5,
            //   top: zeroPoint.y - 2.5,
              fill: 'red',
              padding: 0,
            });

            console.log(this.bezierLineShape);

            // this.bezierLineShape.pathOffset = {x: 0, y: 0};
            // this.bezierLineShape.top = this.bezierLineShape.pathOffset.x * -1;
            // this.bezierLineShape.top = {x: 0, y: 0};

            this.bezierLineShape.set({
              left: this.bezierLineShape.left! - this.bezierLineShape.pathOffset.x - 1.25,
              top: this.bezierLineShape.top! - this.bezierLineShape.pathOffset.y - 1.25
            });

            this.mainGroup.insertAt(this.bezierLineShape, 0, false);
            this.editor?.renderAll();

            console.log(this.mainGroup)
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
        if(this.isActive) {
            this.stop()
        } else {

            this.editor?.add(this.mainGroup);
            // this.mainGroup.add(this.controlsGroup);
            // this.mainGroup.add(this.pathGroup);

            this.editor!.selection = false;
            this.isActive = true;
        }
    }

    stop() {
        this.editor!.selection = true;
        this.isActive = false;
        this.isHoldingShift = false;
    }
}
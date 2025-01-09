import { Tool } from "./tool";
import { Canvas } from "fabric/fabric-impl";
import { fabric } from 'fabric';
import { BezierLinePoint, BezierTrackingCoordInterface } from "../interfaces";

export class PenTool extends Tool {
    currentMousePoint: fabric.Circle | fabric.Rect | null = null;
    allMousePoints: any[] | [] = [];
    bezierLinePoints: BezierLinePoint[] | [] = [];
    bezierLineShape: fabric.Path = new fabric.Path('', {
      strokeWidth: 6,
      stroke: '#2563EB',
      fill: 'transparent',
      padding: 0,
    });
    trackingCoords: BezierTrackingCoordInterface | null = null;
    isMouseDown: boolean = false;
    isModifierPoint: boolean = false;
    isCurveStarted: boolean = false;
    mainGroup = new fabric.Group([], {
        left: 0,
        top: 0,
    });
    currentLetter: string = 'M';
    bezierCounter: number = 0;
    CurrentType: string = 'M';
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

            console.log(this.x, this.y);

            // this.currentMousePoint = new fabric.Rect({
            //     width: 10,
            //     height: 10,
            //     left: this.x - 5,
            //     top: this.y - 5,
            //     fill: '#FFFFFF',
            //     stroke:'#0062BC',
            //     strokeWidth: 1,
            //     padding: 0,
            //     selectable: false,
            // });

            let type = 'L';

            console.log(this.trackingCoords);
            if(this.trackingCoords != null) {
                type = 'C';
                this.trackingCoords = null;
                this.currentLetter = 'L';
            }

            console.log(type);

            const point: BezierLinePoint = {
                x: this.x,
                y: this.y,
                type: type,
                modifier: false
            }

            this.bezierLinePoints = [...this.bezierLinePoints, point];

            this.editor?.renderAll();
            console.log(this.bezierLinePoints);
            if(this.bezierLinePoints.length > 1) {
                this.createBezierLine();
            }
        }
    }

    /*
     *
     * Method to create path, not completed yet
     *
     */
    createBezierLine() {
        // let lowestX: number | null = null;
        // let lowestY: number | null = null;

        // let linePoints: BezierLinePoint[] | [] = [];






        const firstPoint = this.bezierLinePoints[0];

        this.currentLetter = 'M';

        this.CurrentType = 'M';

        let LineString = ``;

        if(this.bezierLinePoints.length > 1) {

            let LineStringObject: { pointList: { x: number; y: number; }[]; type: string }[] = [];

            let CCounter = 0;

            this.bezierLinePoints.map((point, index) => {
                const {x,y,type} = point;



                console.log(CCounter);

                if(index === 0) {
                    LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'M'
                    });
                } else if (type === 'C' && this.CurrentType != 'C') {
                    this.CurrentType = 'C';
                    CCounter++;
                    LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'C'
                    });
                } else if (this.CurrentType === 'C' && CCounter < 3) {
                    CCounter++;
                    LineStringObject[LineStringObject.length - 1].pointList.push({x,y});
                } else if (this.CurrentType === 'C' && CCounter === 3) {
                    CCounter = 1;
                    LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'C'
                    });
                } else if (type === 'L' && this.CurrentType != 'L') {
                    this.CurrentType = 'L';
                    CCounter = 0;
                    LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'L'
                    });
                } else {
                    LineStringObject[LineStringObject.length - 1].pointList.push({x,y});
                }

            });

            console.log(LineStringObject);

            LineStringObject.forEach((line) => {
                const {pointList, type} = line;
                LineString += `${type} `;

                pointList.forEach((point) => {
                    const {x,y} = point;
                    LineString += `${x},${y} `;
                });
            });



            // console.log(this.bezierLinePoints);

            // this.bezierLinePoints.forEach((point) => {
            //     console.log(point);

            //     const {x,y,type} = point;

            //     if(this.currentLetter != type) {
            //         this.currentLetter = type;
            //         LineString += `${this.currentLetter} `;
            //     }

            //     console.log(this.bezierCounter);

            //     if(this.bezierCounter === 3) {
            //         LineString += `C `;
            //         this.bezierCounter = 0;
            //     }

            //     if(type === 'C') {
            //         this.bezierCounter++;
            //     }

            //     LineString += `${x},${y} `;

            // });

            this.editor?.remove(this.bezierLineShape);

            console.log(LineString);

            this.bezierLineShape = new fabric.Path(LineString, {
              strokeWidth: 6,
              stroke: '#2563EB',
              fill: 'transparent',
              padding: 0,
            });

            // this.bezierLineShape.render();

            this.editor?.add(this.bezierLineShape);

        }

        this.editor?.renderAll();

        // this.bezierLinePoints.forEach((point) => {
        //     const {x, y, type}: BezierLinePoint = point;
        //     linePoints = [...linePoints, point];

        //     if(lowestX === null || lowestX > x) {
        //         if(type != 'C') {
        //             lowestX = x;
        //         } else {
        //             lowestX = 0;
        //         }
        //     }
        //     if(lowestY === null || lowestY > y) {
        //         if(type != 'C') {
        //             lowestY = y;
        //         } else {
        //             lowestY = 0;
        //         }
        //     }
        // });

        // if(this.bezierLineShape != null) this.mainGroup.remove(this.bezierLineShape);

        // if(lowestX != null && lowestY != null) {
        //     const firstPoint = linePoints[0];

        //     let zeroPoint = {
        //         x: linePoints[0].x,
        //         y: linePoints[0].y,
        //     };

        //     linePoints.map((point) => {
        //         if (zeroPoint.x < point.x) zeroPoint.x = point.x;
        //         if (zeroPoint.y < point.y) zeroPoint.y = point.y;
        //     });

        //     let mPoint = {
        //         x: firstPoint.x - zeroPoint.x,
        //         y: firstPoint.y - zeroPoint.y
        //     }

        //     if(firstPoint.type === 'C') {
        //         mPoint = {
        //             x: 0,
        //             y: 0
        //         }
        //     }

            // let LineString = `M ${mPoint.x},${mPoint.y}`;
            // let LineString = `M 0,0 L `;

            // let lastLetter = 'M';

            // linePoints.filter((point, index) => {


            //     // const {x, y} = point;

            //     // console.log(point);

            //     const {x, y, type} = point;

            //     if(index > 0) {
            //         if(lastLetter != type) {
            //             LineString += ` ${type}`;
            //             lastLetter = type;
            //         }
            //         LineString += `${x - zeroPoint.x},${y - zeroPoint.y} `;
            //     }

            //     console.log(LineString);
            // });

            // "M 50,150 C 150,50 300,250 350,100 "

            // this.bezierLineShape = new fabric.Path(LineString, {
            //   strokeWidth: 6,
            //   stroke: '#2563EB',
            //   fill: 'transparent',
            //   padding: 0,
            // });

            // this.bezierLineShape.set({
            //   left: this.bezierLineShape.left! - this.bezierLineShape.pathOffset.x - 1.25,
            //   top: this.bezierLineShape.top! - this.bezierLineShape.pathOffset.y - 1.25
            // });

            // this.mainGroup.insertAt(this.bezierLineShape, 0, false);
        //     this.editor?.renderAll();
        // }
    }



    /*
     *
     *
     *
     */
    trackingPoint(e: { e: Event; }) {
        if(this.isActive && this.isMouseDown) {
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;

            console.log(this.x, this.y);

            if(this.bezierLinePoints.length === 1) {
                const firstPoint = this.bezierLinePoints[0];

                const {x,y} = firstPoint;
                const point: BezierLinePoint = {
                    x: x,
                    y: y,
                    type: 'C',
                    modifier: false
                }

                this.bezierLinePoints.pop();

                this.bezierLinePoints = this.bezierLinePoints.filter((point) => point != null);

                this.bezierLinePoints = [...this.bezierLinePoints, point];
            }

            let isFirst = false;

            if(this.trackingCoords === null || this.trackingCoords.number === 1) {
                isFirst = true;
            }

            this.trackingCoords = {
                x: this.x,
                y: this.y,
                type: 'C',
                number: isFirst ? 1 : 2,
                modifier: true,
            }

            // this.currentMousePoint = new fabric.Rect({
            //     width: 10,
            //     height: 10,
            //     left: this.x - 5,
            //     top: this.y - 5,
            //     fill: '#FFFFFF',
            //     stroke:'#0062BC',
            //     strokeWidth: 1,
            //     padding: 0,
            //     selectable: false,
            // });



            // this.allMousePoints = [...this.allMousePoints, this.currentMousePoint]

            // if(!this.isCurveStarted) {
            //     const point = this.bezierLinePoints.pop();
            //     point!.x = this.x;
            //     point!.y = this.y;
            //     point!.type = 'C';
            //     // @ts-ignore
            //     this.bezierLinePoints = [...this.bezierLinePoints, point];
            // }
            // else {

            // }




            // if(this.currentMousePoint != null) {
            //     this.mainGroup.addWithUpdate(this.currentMousePoint);
            //     this.editor?.renderAll();

            //     if(this.bezierLinePoints.length > 1) {
            //         this.createBezierLine();
            //     }
            // }
        }
    }

    /*
     *
     * Method to stop modyfying curve
     *
     */
    stopModyfyingCurve() {
        if(this.isActive) {
            this.isMouseDown = false;

            // @ts-ignore
            if(this.trackingCoords != null && !this.bezierLinePoints.includes(this.trackingCoords)) this.bezierLinePoints = [...this.bezierLinePoints, this.trackingCoords!];

            if(this.bezierLinePoints.length > 3) {
                this.createBezierLine();
                if (this.trackingCoords) {
                    this.trackingCoords.number = 2;
                }
            }


            this.isModifierPoint = false;
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
        const stopModyfying = this.stopModyfyingCurve.bind(this);
        const trackingPoint = this.trackingPoint.bind(this);
        this.editor?.on("mouse:down", (e) => startDrawing(e));
        this.editor?.on("mouse:up", () => stopModyfying());
        this.editor?.on("mouse:move", (e) => trackingPoint(e));
        // window.addEventListener('keydown', (e) => holdingShift(e));
        // window.addEventListener('keyup', (e) => upShift(e));
    }

    start() {
        if(this.isActive) {
            this.stop()
        } else {
            this.editor?.add(this.bezierLineShape);
            console.log(this.bezierLineShape);
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
import { Tool } from "./tool";
import { Canvas } from "fabric/fabric-impl";
import { fabric } from 'fabric';
import { BezierLinePoint, BezierTrackingCoordInterface } from "../interfaces";

// --> Strategy --> MCCCL

// --> reverse second modifier point to make new curve started

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
    trackingCoords: BezierLinePoint | null = null;
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

    modifierPoint: BezierLinePoint | null = null;

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

                this.modifierPoint = {
                    x: this.x,
                    y: this.y,
                    type: type,
                    modifier: true
                }

                this.bezierLinePoints = [...this.bezierLinePoints, this.modifierPoint];
            }

            console.log(type);

            const point: BezierLinePoint = {
                x: this.x,
                y: this.y,
                type: type,
                modifier: false
            }

            this.bezierLinePoints = [...this.bezierLinePoints, point];

            console.log(this.bezierLinePoints);

            this.editor?.renderAll();
            console.log(this.bezierLinePoints);
            if(this.bezierLinePoints.length > 1) {
                this.createBezierLine();
            }
        }
    }

    /*
     *
     * Method to create path
     *
     */
    createBezierLine() {
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

            this.editor?.remove(this.bezierLineShape);

            console.log(LineString);

            this.bezierLineShape = new fabric.Path(LineString, {
              strokeWidth: 6,
              stroke: '#2563EB',
              fill: 'transparent',
              padding: 0,
            });

            this.editor?.add(this.bezierLineShape);

        }

        this.editor?.renderAll();
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

            if(this.modifierPoint === null) {
                this.trackingCoords = {
                    x: this.x,
                    y: this.y,
                    type: 'C',
                    modifier: true,
                }
            } else {
                this.bezierLinePoints[this.bezierLinePoints.length - 2] = {
                    x: this.x,
                    y: this.y,
                    type: 'C',
                    modifier: true,
                }
            }

            console.log(this.modifierPoint);


            if(this.bezierLinePoints.length > 1) {
                this.createBezierLine();
                this.editor?.renderAll();
            }
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
            if(this.trackingCoords != null && !this.bezierLinePoints.includes(this.trackingCoords) && this.modifierPoint === null) this.bezierLinePoints = [...this.bezierLinePoints, this.trackingCoords!];

            if(this.bezierLinePoints.length > 3) {
                this.createBezierLine();
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
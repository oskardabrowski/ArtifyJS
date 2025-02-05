import { Tool } from "./tool";
import { Canvas } from "fabric/fabric-impl";
import { fabric } from 'fabric';
import { BezierLinePoint } from "../interfaces";
import { PointType } from "../enums";

// --> Strategy --> MCCCL

export class PenTool extends Tool {
    currentMousePoint: fabric.Circle | fabric.Rect | null = null;
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
    currentLetter: string = 'M';
    CurrentType: string = 'M';
    modifierPoint: BezierLinePoint | null = null;
    modifierPointOposite: BezierLinePoint | null = null;
    LineStringObject: { pointList: { x: number; y: number; }[]; type: string }[] = [];
    firstPointType: PointType = PointType.FALSE;

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

            if(this.LineStringObject.length > 1) {
                const {pointList, type} = this.LineStringObject[this.LineStringObject.length - 1];
                if(type === 'C' && pointList.length < 3) {
                     this.trackingCoords = {
                        x: this.x,
                        y: this.y,
                        type: 'C',
                        modifier: true,
                    }
                }

            }

            let type = 'L';
            if(this.trackingCoords != null) {
                type = 'C';

                this.currentLetter = 'L';
                this.modifierPoint = {
                    x: this.x,
                    y: this.y,
                    type: type,
                    modifier: true
                }

                this.bezierLinePoints = [...this.bezierLinePoints, this.modifierPoint];
            }

            const point: BezierLinePoint = {
                x: this.x,
                y: this.y,
                type: type,
                modifier: false
            }

            this.bezierLinePoints = [...this.bezierLinePoints, point];

            if(this.trackingCoords != null) {
                this.trackingCoords = null;
                this.modifierPointOposite = {
                    x: this.x,
                    y: this.y,
                    type: 'C',
                    modifier: true
                }

                this.bezierLinePoints = [...this.bezierLinePoints, this.modifierPointOposite];
            }

            this.editor?.renderAll();
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
        this.currentLetter = 'M';
        this.CurrentType = 'M';
        let LineString = ``;

        if(this.bezierLinePoints.length > 1) {

            this.LineStringObject = [];

            let CCounter = 0;

            this.bezierLinePoints.map((point, index) => {
                const {x,y,type} = point;

                if(index === 0) {
                    this.LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'M'
                    });
                } else if (type === 'C' && this.CurrentType != 'C') {
                    this.CurrentType = 'C';
                    CCounter++;
                    this.LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'C'
                    });
                } else if (this.CurrentType === 'C' && CCounter < 3) {
                    CCounter++;
                    this.LineStringObject[this.LineStringObject.length - 1].pointList.push({x,y});
                } else if (this.CurrentType === 'C' && CCounter === 3) {
                    CCounter = 1;
                    this.LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'C'
                    });
                } else if (type === 'L' && this.CurrentType != 'L') {
                    this.CurrentType = 'L';
                    CCounter = 0;
                    this.LineStringObject.push({
                        pointList: [{x,y}],
                        type: 'L'
                    });
                } else {
                    this.LineStringObject[this.LineStringObject.length - 1].pointList.push({x,y});
                }

            });

            this.LineStringObject.forEach((line) => {
                const {pointList, type} = line;
                if(type != 'C' || type === 'C' && pointList.length === 3) LineString += `${type} `;
                pointList.forEach((point) => {
                    const {x,y} = point;
                    if(type != 'C' || type === 'C' && pointList.length === 3) LineString += `${x},${y} `;
                });
            });

            this.editor?.remove(this.bezierLineShape);

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
     * Function created to track mouse position and create position based points
     *
     */
    trackingPoint(e: { e: Event; }) {
        if(this.isActive && this.isMouseDown) {
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;

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
                const {x,y} = this.bezierLinePoints[this.bezierLinePoints.length - 2];
                this.bezierLinePoints[this.bezierLinePoints.length - 3] = {
                    x: this.x,
                    y: this.y,
                    type: 'C',
                    modifier: true,
                }

                let difference_x = x - this.x;
                let difference_y = y - this.y;
                const difference = [(difference_x > 0),(difference_y > 0)];

                let new_x = 0;
                let new_y = 0;

                if(JSON.stringify(difference) === '[true,true]') {
                    new_x = x + difference_x;
                    new_y = y + difference_y;
                }
                else if(JSON.stringify(difference) === '[false,true]') {
                    new_x = x - difference_x;
                    new_y = y + difference_y;
                }
                else if(JSON.stringify(difference) === '[true,false]') {
                    new_x = x + difference_x;
                    new_y = y - difference_y;
                }
                else if(JSON.stringify(difference) === '[false,false]') {
                    new_x = x - difference_x;
                    new_y = y - difference_y;
                }

                if(this.bezierLinePoints.length > 3) {
                    const differenceCheck = [(difference_x > 0),(difference_y > 0)];
                    if(JSON.stringify(differenceCheck) === '[true,true]') {
                        new_x = new_x + difference_x;
                        new_y = new_y + difference_y;
                    }
                    else if(JSON.stringify(differenceCheck) === '[false,true]') {
                        new_x = new_x - (difference_x * -2);
                        new_y = new_y + difference_y;
                    }
                    else if(JSON.stringify(differenceCheck) === '[true,false]') {
                        new_x = new_x + difference_x;
                        new_y = new_y - (difference_y * -2);
                    }
                    else if(JSON.stringify(differenceCheck) === '[false,false]') {
                        new_x = new_x - (difference_x * -2);
                        new_y = new_y - (difference_y * -2);
                    }
                }

                this.bezierLinePoints[this.bezierLinePoints.length - 1] = {
                    x: this.x,
                    y: this.y,
                    type: 'C',
                    modifier: true,
                }
                this.bezierLinePoints[this.bezierLinePoints.length - 3] = {
                    x: new_x,
                    y: new_y,
                    type: 'C',
                    modifier: true,
                }

                this.firstPointType = PointType.TRUE;

            }

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
        this.currentMousePoint = null;
        this.bezierLinePoints = [];
        this.bezierLineShape = new fabric.Path('', {
          strokeWidth: 6,
          stroke: '#2563EB',
          fill: 'transparent',
          padding: 0,
        });
        this.trackingCoords = null;
        this.isMouseDown = false;
        this.isModifierPoint = false;
        this.currentLetter = 'M';
        this.CurrentType = 'M';
        this.modifierPoint = null;
        this.modifierPointOposite = null;
        this.LineStringObject = [];
    }
}
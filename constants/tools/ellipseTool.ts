import {fabric} from 'fabric';
import { Canvas } from "fabric/fabric-impl";

// TODO Handle -x and -y while drawing

/*
 *
 * Free drawing circle tool constructor class
 *
 */
export class EllipseTool {
    editor: Canvas | null = null;
    isActive: boolean = false;
    isDrawing: boolean = false;
    isHoldingShift: boolean = false;
    isUp: boolean = false;
    x: number = 0;
    y: number = 0;

    constructor(editor: Canvas | null) {
        this.editor = editor;
    }

    /*
     *
     * Start drawing shape
     *
     * Method adds circle to canvas and activate it to modify at next step
     *
     */
    startDrawingOnMouseDown(e: any) {
        if(this.isActive) {
            this.isDrawing = true;
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;

            const circle = new fabric.Ellipse({
                left: this.x,
                top: this.y,
                fill: '#DFDFDF',
                padding: 0,
                originX: 'left',
                originY: 'top',
                rx: 0,
                ry: 0,
            });

            this.editor?.add(circle);
            this.editor?.renderAll();
            this.editor?.setActiveObject(circle);
        }
    }

    /*
     *
     * Modify shape by moving mouse
     *
     * Function takes shape, and modify it depends on moving direction
     *
     */
    continueDrawingOnMouseMove(e: any) {
        if(this.isActive) {
            if(!this.isDrawing) {
                return false;
            }
            this.editor!.selection = false;
            const mouse = this.editor?.getPointer(e.e);
            let px = mouse!.x;
            let py = mouse!.y;
            let w = Math.abs(mouse!.x - this.x) / 2;
            let h = Math.abs(mouse!.y - this.y) / 2;

            if (!w || !h) {
                return false;
            }

            const circle = this.editor?.getActiveObject();

            const condition = {x: mouse!.x > this.x, y:mouse!.y > this.y};

            if(this.isHoldingShift) {
                h = w;
                if(condition.y === false) {
                    console.log('Condition 1');
                    px = Math.abs(this.x - w * 2);
                    py = Math.abs(this.y - w * 2);
                    if(this.y < 0) py = this.y - w;
                    if(this.x < 0) px = this.x - w;
                    this.isUp = true;
                } else if (condition.y === true && this.isUp === true) {
                    console.log('Condition 2');
                    this.isUp = false;
                    circle?.set('left', this.x).set('top', this.y);
                }
            }

            // * Switch to handle moving direction
            switch(JSON.stringify(condition)) {
                // @ts-ignore
                case JSON.stringify({x: true, y: true}): circle?.set('padding', 0).set('rx', w).set('ry', h); break;
                // @ts-ignore
                case JSON.stringify({x: false, y: true}): circle?.set('padding', 0).set('left', px).set('rx', w).set('ry', h); break;
                // @ts-ignore
                case JSON.stringify({x: true, y: false}): circle?.set('padding', 0).set('top', py).set('rx', w).set('ry', h); break;
                // @ts-ignore
                case JSON.stringify({x: false, y: false}): circle?.set('padding', 0).set('left', px).set('top', py).set('rx', w).set('ry', h); break;
                // @ts-ignore
                default: circle?.set('padding', 0).set('rx', w).set('ry', h); break;
            }

            this.editor?.renderAll();
        }

    }

    /*
     *
     * Function stops drawing on mouse up event and brings back default editor options
     *
     */
    stopDrawingOnMouseUp() {
        if(this.isActive) {
            const circle = this.editor?.getActiveObject();
            // @ts-ignore
            this.editor?.add(circle);
            this.editor?.renderAll();

            this.isActive = false;
            this.isDrawing = false;

            this.editor!.selection = true;
            this.x = 0;
            this.y = 0;
            this.stop();
        }
    }

    shiftDownHandler(e: any) {
        if(this.isActive) {
            if(e.key === "Shift") {
                this.isHoldingShift = true;
            }
        }
    }
    shiftUpHandler(e: any) {
        if(this.isActive) {
            if(e.key === "Shift") {
                this.isHoldingShift = false;
            }
        }
    }

    /*
     *
     * Initialize tool
     *
     */
    init() {
        const startDrawing = this.startDrawingOnMouseDown.bind(this);
        const continueDrawing = this.continueDrawingOnMouseMove.bind(this);
        const stopDrawing = this.stopDrawingOnMouseUp.bind(this);
        const holdingShift = this.shiftDownHandler.bind(this);
        const upShift = this.shiftUpHandler.bind(this);
        this.editor?.on("mouse:down", (e) => startDrawing(e));
        this.editor?.on("mouse:move", (e) => continueDrawing(e));
        this.editor?.on("mouse:up", () => stopDrawing());
        window.addEventListener('keydown', (e) => holdingShift(e));
        window.addEventListener('keyup', (e) => upShift(e));
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
        this.isHoldingShift = false;
    }
}
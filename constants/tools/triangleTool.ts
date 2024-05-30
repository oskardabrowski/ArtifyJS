import {fabric} from 'fabric';
import { Canvas } from "fabric/fabric-impl";

// TODO Handle -x and -y while drawing

/*
 *
 * Free drawing triangle tool constructor class
 *
 */
export class TriangleTool {
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
     * Method adds triangle to canvas and activate it to modify at next step
     *
     */
    startDrawingOnMouseDown(e: any) {
        if(this.isActive) {
            this.isDrawing = true;
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;

            const triangle = new fabric.Triangle({
                width: 0,
                height: 0,
                left: this.x,
                top: this.y,
                fill: '#DFDFDF',
                padding: 0,
            });

            this.editor?.add(triangle);
            this.editor?.renderAll();
            this.editor?.setActiveObject(triangle);
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
            let w = Math.abs(mouse!.x - this.x);
            let h = Math.abs(mouse!.y - this.y);

            if (!w || !h) {
                return false;
            }

            const triangle = this.editor?.getActiveObject();

            const condition = {x: mouse!.x > this.x, y:mouse!.y > this.y};

            if(this.isHoldingShift) {
                h = w;
                if(condition.y === false) {
                    px = Math.abs(this.x - w);
                    py = Math.abs(this.y - w);
                    if(this.y < 0) py = this.y - w;
                    if(this.x < 0) px = this.x - w;
                    this.isUp = true;
                } else if(condition.y === true && this.isUp === true) {
                    this.isUp = false;
                    triangle?.set('left', this.x).set('top', this.y);
                }
            }

            // * Switch to handle moving direction
            switch(JSON.stringify(condition)) {
                case JSON.stringify({x: true, y: true}): triangle?.set('padding', 0).set('width', w).set('height', h); break;
                case JSON.stringify({x: false, y: true}): triangle?.set('padding', 0).set('left', px).set('width', w).set('height', h); break;
                case JSON.stringify({x: true, y: false}): triangle?.set('padding', 0).set('top', py).set('width', w).set('height', h); break;
                case JSON.stringify({x: false, y: false}): triangle?.set('padding', 0).set('left', px).set('top', py).set('width', w).set('height', h); break;
                default: triangle?.set('padding', 0).set('width', w).set('height', h); break;
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
            const triangle = this.editor?.getActiveObject();
            // @ts-ignore
            this.editor?.add(triangle);
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
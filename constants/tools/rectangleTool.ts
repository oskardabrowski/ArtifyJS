import {fabric} from 'fabric';
import { Canvas } from "fabric/fabric-impl";

/*
 *
 * Free drawing rectangle tool constructor class
 *
 */
export class RectangleTool {
    editor: Canvas | null = null;
    isActive: boolean = false;
    isDrawing: boolean = false;
    x: number = 0;
    y: number = 0;
    constructor(editor: Canvas | null) {
        this.editor = editor;
    }

    /*
     *
     * Start drawing shape
     *
     * Method adds rectangle to canvas and activate it to modify at next step
     *
     */
    startDrawingOnMouseDown(e: any) {
        if(this.isActive) {
            this.isDrawing = true;
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;

            const rectangle = new fabric.Rect({
                width: 0,
                height: 0,
                left: this.x,
                top: this.y,
                fill: '#DFDFDF',
                padding: 0,
            });

            this.editor?.add(rectangle);
            this.editor?.renderAll();
            this.editor?.setActiveObject(rectangle);
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
            const w = Math.abs(mouse!.x - this.x);
            const h = Math.abs(mouse!.y - this.y);

            if (!w || !h) {
                return false;
            }

            const rectangle = this.editor?.getActiveObject();

            const condition = {x: mouse!.x > this.x, y:mouse!.y > this.y};

            // * Switch to handle moving direction
            switch(JSON.stringify(condition)) {
                case JSON.stringify({x: true, y: true}): rectangle?.set('padding', 0).set('width', w).set('height', h); break;
                case JSON.stringify({x: false, y: true}): rectangle?.set('padding', 0).set('left', mouse!.x).set('width', w).set('height', h); break;
                case JSON.stringify({x: true, y: false}): rectangle?.set('padding', 0).set('top', mouse!.y).set('width', w).set('height', h); break;
                case JSON.stringify({x: false, y: false}): rectangle?.set('padding', 0).set('left', mouse!.x).set('top', mouse!.y).set('width', w).set('height', h); break;
                default: rectangle?.set('padding', 0).set('width', w).set('height', h); break;
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
            const rectangle = this.editor?.getActiveObject();
            // @ts-ignore
            this.editor?.add(rectangle);
            this.editor?.renderAll();

            this.isActive = false;
            this.isDrawing = false;

            this.editor!.selection = true;
            this.x = 0;
            this.y = 0;
            this.stop();
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
        this.editor?.on("mouse:down", (e) => startDrawing(e))
        this.editor?.on("mouse:move", (e) => continueDrawing(e))
        this.editor?.on("mouse:up", () => stopDrawing())
    }

    start() {
        console.log('rect tool started');
        this.isActive = true;
    }

    stop() {
        console.log('rect tool stopped');
        this.isActive = false;
    }
}
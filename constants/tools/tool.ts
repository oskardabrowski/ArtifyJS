import {fabric} from 'fabric';
import { Canvas } from "fabric/fabric-impl";

export class Tool {
    editor: Canvas | null = null;
    isActive: boolean = false;
    isDrawing: boolean = false;
    isHoldingShift: boolean = false;
    isUp: boolean = false;
    x: number = 0;
    y: number = 0;
    shapeType: string = '';

    constructor(editor: Canvas | null, shapeType: string) {
        this.editor = editor;
        this.shapeType = shapeType;
    }

    /*
     *
     * Start drawing shape
     *
     * Method adds rectangle to canvas and activate it to modify at next step
     *
     */
    startDrawingOnMouseDown(e: any, shapeType: string) {
        if(this.isActive) {
            this.isDrawing = true;
            const mouse = this.editor?.getPointer(e.e);
            this.x = mouse!.x;
            this.y = mouse!.y;
            let shape: any = null;

            if(shapeType === 'Rect') {
                shape = new fabric.Rect({
                    width: 0,
                    height: 0,
                    left: this.x,
                    top: this.y,
                    fill: '#2563EB',
                    padding: 0,
                });
            } else if (shapeType === 'Triangle') {
                shape = new fabric.Triangle({
                    width: 0,
                    height: 0,
                    left: this.x,
                    top: this.y,
                    fill: '#2563EB',
                    padding: 0,
                });
            } else if (shapeType === 'Ellipse') {
                shape = new fabric.Ellipse({
                    left: this.x,
                    top: this.y,
                    fill: '#2563EB',
                    padding: 0,
                    originX: 'left',
                    originY: 'top',
                    rx: 0,
                    ry: 0,
                });
            }

            if(shape != null) {
                this.editor?.add(shape);
                this.editor?.renderAll();
                this.editor?.setActiveObject(shape);
            }
        }
    }

    /*
     *
     * Modify shape by moving mouse
     *
     * Method takes shape, and modify it depends on moving direction
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
            let w = this.shapeType === 'Ellipse' ? Math.abs(mouse!.x - this.x) / 2 : Math.abs(mouse!.x - this.x);
            let h = this.shapeType === 'Ellipse' ? Math.abs(mouse!.y - this.y) / 2 : Math.abs(mouse!.y - this.y);

            if (!w || !h) {
                return false;
            }

            const shape = this.editor?.getActiveObject();

            const condition = {x: mouse!.x > this.x, y:mouse!.y > this.y};

            if(this.isHoldingShift) {
                h = w;
                if(condition.y === false) {
                    px = this.shapeType === 'Ellipse' ? Math.abs(this.x - w * 2) : Math.abs(this.x - w);
                    py = this.shapeType === 'Ellipse' ? Math.abs(this.y - w * 2) : Math.abs(this.y - w);
                    if(this.y < 0) this.shapeType !== 'Ellipse' ? py = this.y - w : py = this.y - w * 2;
                    if(this.x < 0) this.shapeType !== 'Ellipse' ? px = this.x - w : px = this.x - w * 2;
                    this.isUp = true;
                } else if(condition.y === true && this.isUp === true) {
                    this.isUp = false;
                    shape?.set('left', this.x).set('top', this.y);
                }
            }

            if(this.shapeType !== 'Ellipse') {
                // * Switch to handle moving direction
                switch(JSON.stringify(condition)) {
                    case JSON.stringify({x: true, y: true}): shape?.set('padding', 0).set('width', w).set('height', h); break;
                    case JSON.stringify({x: false, y: true}): shape?.set('padding', 0).set('left', px).set('width', w).set('height', h); break;
                    case JSON.stringify({x: true, y: false}): shape?.set('padding', 0).set('top', py).set('width', w).set('height', h); break;
                    case JSON.stringify({x: false, y: false}): shape?.set('padding', 0).set('left', px).set('top', py).set('width', w).set('height', h); break;
                    default: shape?.set('padding', 0).set('width', w).set('height', h); break;
                }
            } else {
                // * Switch to handle moving direction
                switch(JSON.stringify(condition)) {
                    // @ts-ignore
                    case JSON.stringify({x: true, y: true}): shape?.set('padding', 0).set('rx', w).set('ry', h); break;
                    // @ts-ignore
                    case JSON.stringify({x: false, y: true}): shape?.set('padding', 0).set('left', px).set('rx', w).set('ry', h); break;
                    // @ts-ignore
                    case JSON.stringify({x: true, y: false}): shape?.set('padding', 0).set('top', py).set('rx', w).set('ry', h); break;
                    // @ts-ignore
                    case JSON.stringify({x: false, y: false}): shape?.set('padding', 0).set('left', px).set('top', py).set('rx', w).set('ry', h); break;
                    // @ts-ignore
                    default: shape?.set('padding', 0).set('rx', w).set('ry', h); break;
                }
            }


            this.editor?.renderAll();
        }
    }

    /*
     *
     * Method stops drawing on mouse up event and brings back default editor options
     *
     */
    stopDrawingOnMouseUp() {
        if(this.isActive) {
            const shape = this.editor?.getActiveObject();
            // @ts-ignore
            this.editor?.add(shape);
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
        const holdingShift = this.shiftDownHandler.bind(this);
        const upShift = this.shiftUpHandler.bind(this);
        this.editor?.on("mouse:down", (e) => startDrawing(e, this.shapeType));
        this.editor?.on("mouse:move", (e) => continueDrawing(e));
        this.editor?.on("mouse:up", () => stopDrawing());
        window.addEventListener('keydown', (e) => holdingShift(e));
        window.addEventListener('keyup', (e) => upShift(e));
    }

    /*
     *
     * Method blocking all objects while drawing
     *
     */
    blockObjectsWhileDrawing() {
        this.editor?.forEachObject((obj) => obj.selectable = false);
    }

    /*
     *
     * Method unblocking all objects after drawing
     *
     */
    unblockObjectsAfterDrawing() {
        this.editor?.forEachObject((obj) => obj.selectable = true);
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

    start() {
        this.isActive = true;
        this.blockObjectsWhileDrawing();
    }

    stop() {
        this.isActive = false;
        this.isHoldingShift = false;
        this.unblockObjectsAfterDrawing();
    }


}
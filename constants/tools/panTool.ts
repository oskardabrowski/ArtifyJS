import { Canvas } from "fabric/fabric-impl";

/*
 *
 * Pan using mouse center button or tool
 *
 */
export class PanTool {
    editor: Canvas | null = null;
    isActive: boolean = false;
    isHoldingWheel: boolean = false;
    lastPosX: number = 0;
    lastPosY: number = 0;

    constructor(editor: Canvas | null) {
        this.editor = editor;
    }

    wheelDownHandler(e: any) {
        if(e.button === 1) {
            this.isHoldingWheel = true;
            this.editor!.selection = false;
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        } else if (e.button === 0 && this.isActive) {
            this.isHoldingWheel = true;
            this.editor!.selection = false;
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }

    }
    wheelUpHandler(e: any) {
        if(e.button === 1) {
            this.isHoldingWheel = false;
            this.editor!.selection = true;
            this.lastPosX = 0;
            this.lastPosY = 0;
        } else if (e.button === 0 && this.isActive) {
            this.isHoldingWheel = false;
            this.editor!.selection = true;
            this.lastPosX = 0;
            this.lastPosY = 0;
        }
    }

    /*
     *
     * Initialize tool, all needed options are inside
     *
     */
    init() {
        this.editor?.on('mouse:move', (e) => {
            if(this.isHoldingWheel) {
                const event = e.e;
                let vpt = this.editor?.viewportTransform;
                if(vpt) {
                    vpt[4] += event.clientX - this.lastPosX;
                    vpt[5] += event.clientY - this.lastPosY;
                    this.editor?.requestRenderAll();
                    this.lastPosX = event.clientX;
                    this.lastPosY = event.clientY;
                }
            }
        });

        const holdingWheel = this.wheelDownHandler.bind(this);
        const upWheel = this.wheelUpHandler.bind(this);

        window.addEventListener('mousedown', (e) => holdingWheel(e));
        window.addEventListener('mouseup', (e) => upWheel(e));
    }

    start() {
        if(this.isActive) {
            this.stop();
        } else {
            this.isActive = true;
            this.editor!.selection = false;
        }
    }

    stop() {
        this.isActive = false;
        this.editor!.selection = true;
    }
}
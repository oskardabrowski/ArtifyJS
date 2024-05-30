import { Canvas } from "fabric/fabric-impl";

/*
 *
 * Zoom using wheel and holding Ctrl, not much params needed
 *
 */
export class ZoomTool {
    editor: Canvas | null = null;
    isHoldingCtrl: boolean = false;

    constructor(editor: Canvas | null) {
        this.editor = editor;
    }

    shiftDownHandler(e: any) {
        if(e.key === "Control") {
            this.isHoldingCtrl = true;
        }
    }
    shiftUpHandler(e: any) {
        if(e.key === "Control") {
            this.isHoldingCtrl = false;
        }
    }

    /*
     *
     * Initialize tool, all needed options are inside
     *
     */
    init() {
        this.editor?.on('mouse:wheel', (e) => {
            if(this.isHoldingCtrl) {
                const delta = e.e.deltaY;
                let zoom = this.editor?.getZoom();
                zoom! *= 0.999 ** delta;
                this.editor?.zoomToPoint({ x: e.e.offsetX, y: e.e.offsetY }, zoom!);
                e.e.preventDefault();
                e.e.stopPropagation();
            }
        });

        const holdingCtrl = this.shiftDownHandler.bind(this);
        const upCtrl = this.shiftUpHandler.bind(this);

        window.addEventListener('keydown', (e) => holdingCtrl(e));
        window.addEventListener('keyup', (e) => upCtrl(e));
    }
}
import {fabric} from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { RefObject } from 'react';
import { ScaleControls } from '.';

/*

This Object is created to set drawing environment
It takes html canvas RefObject and create fabric Canvas with custom controls

*/
export class VectorEditor {
    fabricCanvas: Canvas | null = null;
    drawingAreaRef: RefObject<HTMLCanvasElement> | null = null;

    constructor(drawingAreaRef: RefObject<HTMLCanvasElement>) {
        this.drawingAreaRef = drawingAreaRef;
    }

    /*
     *
     * Initialize fabric canvas
     *
     */
    setFabricCanvas() {
        this.fabricCanvas = new fabric.Canvas(this.drawingAreaRef!.current, {
          width: window.innerWidth,
          height: window.innerHeight,
        });
    }

    /*
     *
     * Setting style for editing borders
     *
     */
    setBorders() {
        fabric.Object.prototype.set({
          transparentCorners: false,
          cornerStrokeColor: 'white',
          cornerColor: 'blue',
          borderColor: "blue",
          cornerSize: 10,
          padding: 0,
          cornerStyle: 'rect',
          borderScaleFactor: 0.5,
          strokeWidth: 3,
        });
    }

    /*
     *
     * Setting custom style for rotating controller
     *
     */
    // @ts-ignore
    renderRotateControl(ctx, left, top) {
      // @ts-ignore
      var size = this.cornerSize;
      ctx.save();
      const grad=ctx.createLinearGradient(left - size, top - size/2, left + 2, top - size/2);
      grad.addColorStop(0, "white");
      grad.addColorStop(1, "#E2F1FF");
      ctx.shadowColor = "rgba(0,0,0,.35)";
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(left - size/64, top - size/64, size, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#0085FF";
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    };

    /*
    *
    * Setting custom rotating controller
    *
    */
    renderCustomRotationController() {
        fabric.Object.prototype.controls.mtr = new fabric.Control({
          x: 0,
          y: -0.5,
          offsetX: 0,
          offsetY: -40,
          cursorStyle: 'crosshair',
          // @ts-ignore
          actionHandler: fabric.controlsUtils.rotationWithSnapping,
          actionName: 'rotate',
          render: this.renderRotateControl,
          // @ts-ignore
          cornerSize: 7,
          withConnection: true,
        });
    }

    /*
     *
     * Setting style for rest of custom controllers
     *
     */
    // @ts-ignore
    renderControls(ctx, left, top) {
      // @ts-ignore
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      const grad=ctx.createLinearGradient(0 - size, 0 - size/2, 0 + 2, 0 - size/2);
      grad.addColorStop(0, "#0085FF");
      grad.addColorStop(1, "#0062BC");
      ctx.shadowColor = "rgba(0,0,0,.35)";
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    };

    renderCustomControls() {
        ScaleControls.map((el) => {
          const {name, x, y, actionHandler} = el;

          fabric.Object.prototype.controls[name] = new fabric.Control({
            x: x,
            y: y,
            // @ts-ignore
            actionHandler: actionHandler,
            render: this.renderControls,
            // @ts-ignore
            cornerSize: 6,
            withConnection: false,
          });
        });
    }

    createTestObjects() {
        const circle = new fabric.Circle({
          radius: 100, fill: 'green', left: 100, top: 100
        });

        this.fabricCanvas?.add(circle);

        const rect = new fabric.Rect({
          fill: 'green', left: 400, top: 400, width: 200, height: 200
        });

        this.fabricCanvas?.add(rect);

        const ellip = new fabric.Ellipse({
          left: 300,
          top: 300,
          strokeWidth: 1,
          stroke: 'none',
          fill: 'red',
          selectable: true,
          originX: 'center',
          originY: 'center',
          rx: 200,
          ry: 100
        });

        this.fabricCanvas?.add(ellip);
    }

    init() {
        this.setFabricCanvas();
        this.setBorders();
        this.renderCustomRotationController();
        this.renderCustomControls();
        this.createTestObjects();
    }

    get fabricCanvasRef() {
        return this.fabricCanvas;
    }
}


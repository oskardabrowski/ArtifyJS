import {fabric} from 'fabric';
import { RefObject } from 'react';

/*

This function is created to set drawing environment
It takes html canvas RefObject and create fabric Canvas with custom controls

*/

export function createEditor(drawingAreaRef: RefObject<HTMLCanvasElement>) {

    /*
     *
     * Initialize fabric canvas
     *
     */
    const init = new fabric.Canvas(drawingAreaRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

     /*
     ?
     ? Test circle, will be removed
     ?
     */
    const circle = new fabric.Circle({
      radius: 100, fill: 'green', left: 100, top: 100
    });

    init.add(circle);

    /*
     *
     * Setting style for editing borders
     *
     */
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

    /*
     *
     * Setting custom style for rotating controller
     *
     */
    // @ts-ignore
    function renderRotateControl(ctx, left, top) {
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
    fabric.Object.prototype.controls.RotateController = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetX: 0,
      offsetY: -40,
      cursorStyle: 'crosshair',
      // @ts-ignore
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      actionName: 'rotate',
      render: renderRotateControl,
      // @ts-ignore
      cornerSize: 7,
      withConnection: true,
    });

    /*
     *
     * Setting style for rest of custom controllers
     *
     */
    // @ts-ignore
    function renderControls(ctx, left, top) {
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

    /*
     *
     * Override default controllers
     *
     */
    const ScaleControls = [
      {
        name: "tl",
        x: -0.5,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
      },
      {
        name: "mt",
        x: 0,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      },
      {
        name: "tr",
        x: 0.5,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
      },
      {
        name: "mr",
        x: 0.5,
        y: 0,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      },
      {
        name: "ml",
        x: -0.5,
        y: 0,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      },
      {
        name: "bl",
        x: -0.5,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
      },
      {
        name: "mb",
        x: 0,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      },
      {
        name: "br",
        x: 0.5,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
      },
    ];

    /*
     *
     * Overriding defaults
     *
     */
    ScaleControls.map((el) => {
      const {name, x, y, actionHandler} = el;

      fabric.Object.prototype.controls[name] = new fabric.Control({
        x: x,
        y: y,
        // @ts-ignore
        actionHandler: actionHandler,
        render: renderControls,
        // @ts-ignore
        cornerSize: 6,
        withConnection: false,
      });
    });

    return init;
}
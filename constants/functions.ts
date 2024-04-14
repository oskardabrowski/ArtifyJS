import {fabric} from 'fabric';
import { RefObject } from 'react';

/*

This function is created to set drawing environment
It takes html canvas RefObject and create fabric Canvas with custom controls

*/

export function createEditor(drawingAreaRef: RefObject<HTMLCanvasElement>) {

    const init = new fabric.Canvas(drawingAreaRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const circle = new fabric.Circle({
      radius: 100, fill: 'green', left: 100, top: 100
    });

    init.add(circle);

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

    const ScaleControls = [
      {
        name: "ScaleTopLeftController",
        x: -0.5,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
        actionName: 'scale',
      },
      {
        name: "ScaleTopController",
        x: 0,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        actionName: 'scale',
      },
      {
        name: "ScaleTopRightController",
        x: 0.5,
        y: -0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        actionName: 'scale',
      },
      {
        name: "ScaleMiddleRightController",
        x: 0.5,
        y: 0,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingX,
        actionName: 'scale',
      },
      {
        name: "ScaleMiddleLeftController",
        x: -0.5,
        y: 0,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingX,
        actionName: 'scale',
      },
      {
        name: "ScaleBottomLeftController",
        x: -0.5,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
        actionName: 'scale',
      },
      {
        name: "ScaleBottomController",
        x: 0,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingY,
        actionName: 'scale',
      },
      {
        name: "ScaleBottomRightController",
        x: 0.5,
        y: 0.5,
        cursorStyle: 'crosshair',
        // @ts-ignore
        actionHandler: fabric.controlsUtils.scalingEqually,
        actionName: 'scale',
      },
    ];

    ScaleControls.map((el) => {
      const {name, x, y, cursorStyle, actionHandler, actionName} = el;

      fabric.Object.prototype.controls[name] = new fabric.Control({
        x: x,
        y: y,
        offsetX: 0,
        offsetY: 0,
        cursorStyle: cursorStyle,
        // @ts-ignore
        actionHandler: actionHandler,
        actionName: actionName,
        render: renderControls,
        // @ts-ignore
        cornerSize: 6,
        withConnection: false,
      });
    });

    console.log(fabric.Object.prototype.controls)

    return init;
}

// TL BL TR BR
// ML MB MR MT



// http://fabricjs.com/controls-api
// http://fabricjs.com/controls-customization
//
//
//

// TODO Fix scaling and others for new controls
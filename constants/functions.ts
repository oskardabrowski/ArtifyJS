import {fabric} from 'fabric';
import { RefObject } from 'react';

export function createEditor(drawingAreaRef: RefObject<HTMLCanvasElement>) {
    const init = new fabric.Canvas(drawingAreaRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    var circle = new fabric.Circle({
      radius: 100, fill: 'green', left: 100, top: 100
    });

    init.add(circle)

    return init;
}
"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import DrawingArea from "./DrawingArea";

import { useRef, useEffect } from "react";
// @ ts-ignore
import {fabric} from 'fabric';
import { Canvas } from "fabric/fabric-impl";

const Editor = () => {
  const drawingAreaRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvas = useRef<Canvas | null>(null);

  useEffect(() => {
    const init = new fabric.Canvas(drawingAreaRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    drawingCanvas.current = init;

    var circle = new fabric.Circle({
      radius: 100, fill: 'green', left: 100, top: 100
    });

    drawingCanvas.current.add(circle)
  }, [])

  useEffect(() => {
    drawingCanvas.current?.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [window.innerWidth, window.innerHeight])



  return (
    <EditorField style={{ background: "white" }}>
        <DrawingArea drawingAreaRef={drawingAreaRef} />
        <LeftBar />
        <RightBar />
    </EditorField>
  )
}

export default Editor
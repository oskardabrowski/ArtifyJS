"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import DrawingArea from "./DrawingArea";
import { createEditor } from "../constants/functions";

import { useRef, useEffect } from "react";
import { Canvas } from "fabric/fabric-impl";

const Editor = () => {
  const drawingAreaRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvas = useRef<Canvas | null>(null);

  useEffect(() => {
    const init = createEditor(drawingAreaRef);
    drawingCanvas.current = init;
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
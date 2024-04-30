"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import DrawingArea from "./DrawingArea";

import { useRef, useEffect } from "react";
import { Canvas } from "fabric/fabric-impl";
import { VectorEditor } from "../constants/classes";
import { RectangleTool } from "../constants/tools/rectangleTool";


const Editor = () => {
  const drawingAreaRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvas = useRef<Canvas | null>(null);

  useEffect(() => {
    // * Initialize fabric canvas vector editor
    const editor = new VectorEditor(drawingAreaRef);
    editor.init();
    drawingCanvas.current = editor.fabricCanvasRef;

    const rect = new RectangleTool(drawingCanvas.current);
    rect.init();
    rect.start();
  }, []);

  useEffect(() => {
    drawingCanvas.current?.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, window.innerHeight]);

  return (
    <EditorField style={{ background: "white" }}>
        <DrawingArea drawingAreaRef={drawingAreaRef} />
        <LeftBar />
        <RightBar />
    </EditorField>
  )
}

export default Editor
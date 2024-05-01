"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import DrawingArea from "./DrawingArea";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "fabric/fabric-impl";
import { VectorEditor } from "../constants/classes";
import { RectangleTool } from "../constants/tools/rectangleTool";
import { ToolManager } from "../constants/toolsManager";

const Editor = () => {
  const drawingAreaRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvas = useRef<Canvas | null>(null);
  const [toolName, setToolName] = useState<string | null>(null);

  const [editorState, setEditorState] = useState<VectorEditor | null>(null);
  const [rectState, setRectState] = useState<RectangleTool | null>(null);

  // TODO Works but it's not the best solution
  // TODO I plan to move all of that to ToolManager object
  // TODO But there was problem with managing tool and their state

  useEffect(() => {
    // * Initialize fabric canvas vector editor
    const editor = new VectorEditor(drawingAreaRef);
    setEditorState(editor);
  }, []);

  useEffect(() => {
    if(editorState) {
      editorState.init();
      const rectTool = new RectangleTool(editorState.fabricCanvas);
      setRectState(rectTool);
    }
  }, [editorState]);

  useEffect(() => {
    if(rectState) rectState.init();
  }, [rectState])

  useEffect(() => {
    console.log(toolName);
    if(toolName === 'rect' && rectState) {
      rectState.start();
      setToolName(null);
    }
  }, [toolName, rectState]);

  useEffect(() => {
    drawingCanvas.current?.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [window.innerWidth, window.innerHeight]);

  return (
    <EditorField style={{ background: "white" }}>
        <DrawingArea drawingAreaRef={drawingAreaRef} />
        <LeftBar setToolName={setToolName} />
        <RightBar />
    </EditorField>
  )
}

export default Editor
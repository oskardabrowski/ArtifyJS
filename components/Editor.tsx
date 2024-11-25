"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import DrawingArea from "./DrawingArea";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "fabric/fabric-impl";
import { VectorEditor } from "../constants/classes";
import { ToolManager } from "../constants/toolsManager";

const Editor = () => {
  const drawingAreaRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvas = useRef<Canvas | null>(null);
  const [toolName, setToolName] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<VectorEditor | null>(null);
  const [toolManagerState, setToolManagerState] = useState<ToolManager | null>(null);

  useEffect(() => {
    // * Initialize fabric canvas vector editor and pass it into state
    const editor = new VectorEditor(drawingAreaRef);
    setEditorState(editor);
  }, []);

  useEffect(() => {
    // * Initialize editor and create tool manager and pass it into state
    if(editorState) {
      editorState.init();
      const manage = new ToolManager(editorState.fabricCanvas);
      setToolManagerState(manage)
    }
  }, [editorState]);

  useEffect(() => {
    // * Initialize all tools
    if(toolManagerState) toolManagerState.initializeTools();
  }, [toolManagerState])

  useEffect(() => {
    // * Start selected tool and set tool name state as null to allow reinitialize
    toolManagerState?.startSelectedTool(toolName);
    setToolName(null);
  }, [toolName, toolManagerState]);

  useEffect(() => {
    // * setting canvas dimensions
    drawingCanvas.current?.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, window.innerHeight]);

  return (
    <EditorField style={{ background: "#1A1A1A" }}>
        <DrawingArea drawingAreaRef={drawingAreaRef} />
        <LeftBar setToolName={setToolName} />
        <RightBar />
        <TopBar setToolName={setToolName} />
    </EditorField>
  )
}

export default Editor
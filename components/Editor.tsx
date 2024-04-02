"use client";
import "../vendors/chromoselector.min.css";
import "../vendors/chromoselector.min.js";
import {EditorField} from './GlobalStyles';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

const Editor = () => {
  return (
    <EditorField style={{ background: "#112836" }}>
        <LeftBar />
        <RightBar />
    </EditorField>
  )
}

export default Editor
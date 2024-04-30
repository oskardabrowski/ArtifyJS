"use client";

import { ToolContainer } from "./UiStyles";
import { ToolPropsInterface } from "../../constants/interfaces";

const Tool = ({clickHandler, valueProp, toolType, submenu, name, mouseEnterHandler, mouseLeaveHandler, children}: ToolPropsInterface) => {
  return (
    <ToolContainer onClick={() => clickHandler(toolType, valueProp)} onMouseOver={() => mouseEnterHandler({submenu, name})} onMouseLeave={() => mouseLeaveHandler(submenu)}>{children}</ToolContainer>
  )
}

export default Tool
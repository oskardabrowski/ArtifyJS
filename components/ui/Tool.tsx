"use client";

import { ToolContainer } from "./UiStyles";
import { ToolPropsInterface } from "../../constants/interfaces";

const Tool = ({submenu, name, mouseEnterHandler, mouseLeaveHandler, children}: ToolPropsInterface) => {
  return (
    <ToolContainer onMouseOver={() => mouseEnterHandler({submenu, name})} onMouseLeave={() => mouseLeaveHandler(submenu)}>{children}</ToolContainer>
  )
}

export default Tool
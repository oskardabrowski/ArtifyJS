"use client";
import Bar from "./ui/Bar";
import Tool from "./ui/Tool";
import { Tools } from "../constants";
import Icons from "./ui/Icons";
import { ToolSubmenu } from "./ui/UiStyles";
import { useEffect, useState } from "react";
import { ToolMouseEnterInterface } from "../constants/interfaces";
import { initializeSelectedTool } from "../constants/functions";
import { ToolType } from "../constants/enums";
import { LeftBarInterface } from "../constants/interfaces";
import { BottomBars as LeftBarStyle } from "./ui/UiStyles";

const LeftBar = ({setToolName}: LeftBarInterface) => {
  const [submenuHoverState, setSubmenuHoverState] = useState("");

  const mouseEnterHandler = ({submenu, name}:ToolMouseEnterInterface):void => {
    if(submenu) setSubmenuHoverState(name);
  }
  const mouseLeaveHandler = (submenu: {vector: string; name: string; value: string;}[] | undefined):void => {
    if(submenu) setSubmenuHoverState("");
  }
  const clickHandler = (type: ToolType, name: string) => {
      switch(type) {
        case ToolType.none: break;
        case ToolType.yes: setToolName(name); break;
        default: break;
      }
  }
  return (
    <LeftBarStyle style={{ position: 'absolute', top: '65px', left: '10px' }}>
        <Bar>
            {
                Tools.map((el, index) => {
                    const {name, value, vector, submenu} = el;
                    const topMenu = index > 8;
                    const toolType = submenu != undefined ? ToolType.none : ToolType.yes;
                    return <Tool clickHandler={clickHandler} valueProp={value} toolType={toolType} key={index} submenu={submenu} name={name} mouseEnterHandler={mouseEnterHandler} mouseLeaveHandler={mouseLeaveHandler}>
                        <Icons iconName={vector} />
                        {submenu &&
                            <ToolSubmenu style={{ top: topMenu ? "auto" : "0", bottom: topMenu ? "0" : "auto", clipPath: submenuHoverState === name ? "polygon(0 0, 110% 0, 110% 110%, 0% 110%)" : "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}>
                                {submenu.map((el, index) => {
                                    const {vector, name, value} = el;
                                    return <button onClick={() => clickHandler(ToolType.yes, value)} key={index} id={value}>
                                        {vector != "" ? <Icons iconName={vector} /> : ""}
                                        <span>{name}</span>
                                    </button>;
                                })}
                            </ToolSubmenu>
                        }
                    </Tool>
                })
            }
        </Bar>
    </LeftBarStyle>
  )
}

export default LeftBar
"use client";
import Bar from "./ui/Bar";
import Tool from "./ui/Tool";
import { Tools } from "../constants";
import Icons from "./ui/Icons";
import { ToolSubmenu } from "./ui/UiStyles";
import { useState } from "react";
import { ToolMouseEnterInterface } from "../constants/interfaces";
import { initializeSelectedTool } from "../constants/functions";
import { ToolType } from "../constants/enums";

const LeftBar = () => {
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
        case ToolType.yes: initializeSelectedTool(name); break;
        default: break;
    }
  }
  return (
    <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
        <Bar>
            {
                Tools.map((el, index) => {
                    const {name, value, vector, submenu} = el;
                    const topMenu = index > 8;
                    const toolType = submenu != undefined ? ToolType.none : ToolType.yes;
                    return <Tool clickHandler={clickHandler} valueProp={value} toolType={toolType} key={index} submenu={submenu} name={name} mouseEnterHandler={mouseEnterHandler} mouseLeaveHandler={mouseLeaveHandler}>
                        <Icons iconName={vector} />
                        {submenu &&
                            <ToolSubmenu style={{ top: topMenu ? "auto" : "0", bottom: topMenu ? "0" : "auto", clipPath: submenuHoverState === name ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}>
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
    </div>
  )
}

export default LeftBar
"use client";

import Bar from "./ui/Bar";
import { TopBar as TopBarStyle } from "./ui/UiStyles";
import Image from "next/image";
import { TopBarTools } from "../constants";
import { ToolMouseEnterInterface } from "../constants/interfaces";
import { useState } from "react";
import { ToolType } from "../constants/enums";
import { ToolNameInterface } from "../constants/interfaces";
import { MovableBarStyleFlex } from "./ui/UiStyles";

const TopBar = ({setToolName}: ToolNameInterface) => {
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
        <TopBarStyle style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <MovableBarStyleFlex style={{ height: '49px !important' }}>
                <Image style={{ borderRight: '1.5px solid rgba(30, 64, 175, 0.4)', borderRadius: '0px 5px 5px 0px' }} src="/ArtifyJsIcon.png" alt="Logo" width={49} height={49}/>
                {
                    TopBarTools.map((el, index) => {
                        return el.type;
                    })
                }
            </MovableBarStyleFlex>
        </TopBarStyle>
    )
}

export default TopBar
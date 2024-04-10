"use client";
import Bar from "./ui/Bar";
import Tool from "./ui/Tool";
import { Tools } from "../constants";
import Icons from "./ui/Icons";

const LeftBar = () => {
  return (
    <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
        <Bar>
            {
                Tools.map((el, index) => {
                    const {name, value, vector} = el;
                    return <Tool key={index}>
                        <Icons iconName={vector} />
                    </Tool>
                })
            }
        </Bar>
    </div>
  )
}

export default LeftBar
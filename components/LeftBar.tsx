"use client";
import { BsFillPencilFill } from "react-icons/bs";
import Bar from "./ui/Bar";
import Tool from "./ui/Tool";

const LeftBar = () => {
  return (
    <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
        <Bar>
            {
                Array.from(Array(10).keys()).map((el, index) => {
                    return (<Tool key={index}>
                        <BsFillPencilFill />
                    </Tool>)
                })
            }
        </Bar>
    </div>
  )
}

export default LeftBar
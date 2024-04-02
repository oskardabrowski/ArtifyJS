"use client";
import { MovableBarStyle } from "./UiStyles";
import Movable from "./Movable";

const Bar = ({children}: any) => {
  return (
    <MovableBarStyle>
        <Movable />
        {
            children
        }
    </MovableBarStyle>
  )
}

export default Bar
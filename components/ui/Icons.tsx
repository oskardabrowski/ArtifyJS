"use client";
import { IconsInterface } from "../../constants/interfaces";
import { BsVectorPen } from "react-icons/bs";
import { IoShapes } from "react-icons/io5";


const Icons = ({iconName}: IconsInterface) => {
  return (
    <>
      {
        {
          'BsVectorPen': <BsVectorPen />,
          'IoShapes': <IoShapes />,
        }[iconName]
      }
    </>
  )
}

export default Icons
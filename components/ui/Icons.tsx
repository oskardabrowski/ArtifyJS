"use client";
import { IconsInterface } from "../../constants/interfaces";
import { BsVectorPen, BsPen } from "react-icons/bs";
import { IoShapesOutline, IoHandRightOutline, IoTextOutline, IoCropSharp } from "react-icons/io5";
import { MdOutlineGradient } from "react-icons/md";
import { TiImage } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { PiNavigationArrow } from "react-icons/pi";
import { TbArrowsMoveVertical } from "react-icons/tb";
import { TbTransformFilled } from "react-icons/tb";
import { LuCombine } from "react-icons/lu";
import { LuAlignCenterHorizontal } from "react-icons/lu";

const Icons = ({iconName}: IconsInterface) => {
  return (
    <>
      {
        {
          'BsVectorPen': <BsVectorPen />,
          'IoShapesOutline': <IoShapesOutline />,
          'BsPen': <BsPen />,
          'PiNavigationArrow': <PiNavigationArrow />,
          'MdOutlineGradient': <MdOutlineGradient />,
          'TiImage': <TiImage />,
          'IoHandRightOutline': <IoHandRightOutline />,
          'IoIosSearch': <IoIosSearch />,
          'IoTextOutline': <IoTextOutline />,
          'IoCropSharp': <IoCropSharp />,
          'TbArrowsMoveVertical': <TbArrowsMoveVertical />,
          'TbTransformFilled': <TbTransformFilled />,
          'LuCombine': <LuCombine />,
          'LuAlignCenterHorizontal': <LuAlignCenterHorizontal />,
        }[iconName]
      }
    </>
  )
}

export default Icons
"use client";
import { IconsInterface } from "../../constants/interfaces";
import { BsVectorPen, BsPen } from "react-icons/bs";
import { IoShapesOutline, IoHandRightOutline, IoTextOutline, IoCropSharp } from "react-icons/io5";
import { MdOutlineGradient, MdOutlineVerticalAlignTop, MdOutlineVerticalAlignBottom } from "react-icons/md";
import { TiImage } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { PiNavigationArrow } from "react-icons/pi";
import { TbArrowsMoveVertical, TbTransformFilled } from "react-icons/tb";
import { LuCombine, LuAlignCenterHorizontal, LuCircle, LuTriangle, LuMoveUp, LuMoveDown } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";
import { RiTextBlock, RiText } from "react-icons/ri";

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
          'LuCircle': <LuCircle />,
          'BiRectangle': <BiRectangle />,
          'LuTriangle': <LuTriangle />,
          'RiText': <RiText />,
          'RiTextBlock': <RiTextBlock />,
          'MdOutlineVerticalAlignTop': <MdOutlineVerticalAlignTop />,
          'MdOutlineVerticalAlignBottom': <MdOutlineVerticalAlignBottom />,
          'LuMoveUp': <LuMoveUp />,
          'LuMoveDown': <LuMoveDown />,
        }[iconName]
      }
    </>
  )
}

export default Icons
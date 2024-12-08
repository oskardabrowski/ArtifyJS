"use client";
import { IconsInterface } from "../../constants/interfaces";
import { BsVectorPen, BsPen } from "react-icons/bs";
import { IoShapesOutline, IoHandRightOutline, IoTextOutline, IoCropSharp, IoAddCircle } from "react-icons/io5";
import { MdOutlineGradient, MdOutlineVerticalAlignTop, MdOutlineVerticalAlignBottom } from "react-icons/md";
import { TiImage } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { PiNavigationArrow } from "react-icons/pi";
import { TbArrowsMoveVertical, TbTransform, TbLayersUnion, TbLayersSubtract, TbLayersIntersect, TbLayersIntersect2 } from "react-icons/tb";
import { LuCombine, LuCircle, LuTriangle, LuMoveUp, LuMoveDown, LuRotateCw, LuRotateCcw } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";
import { RiTextBlock, RiText, RiAlignItemLeftFill } from "react-icons/ri";
import { PiFlipHorizontal, PiFlipVertical } from "react-icons/pi";
import { CgPathDivide } from "react-icons/cg";
import { RiSave3Fill } from "react-icons/ri";
import { LuPrinter } from "react-icons/lu";
import { GrDocumentConfig } from "react-icons/gr";

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
          'TbTransform': <TbTransform />,
          'LuCombine': <LuCombine />,
          'RiAlignItemLeftFill': <RiAlignItemLeftFill />,
          'LuCircle': <LuCircle />,
          'BiRectangle': <BiRectangle />,
          'LuTriangle': <LuTriangle />,
          'RiText': <RiText />,
          'RiTextBlock': <RiTextBlock />,
          'MdOutlineVerticalAlignTop': <MdOutlineVerticalAlignTop />,
          'MdOutlineVerticalAlignBottom': <MdOutlineVerticalAlignBottom />,
          'LuMoveUp': <LuMoveUp />,
          'LuMoveDown': <LuMoveDown />,
          'PiFlipHorizontal': <PiFlipHorizontal />,
          'PiFlipVertical': <PiFlipVertical />,
          'LuRotateCw': <LuRotateCw />,
          'LuRotateCcw': <LuRotateCcw />,
          'TbLayersUnion': <TbLayersUnion />,
          'TbLayersSubtract': <TbLayersSubtract />,
          'TbLayersIntersect': <TbLayersIntersect />,
          'TbLayersIntersect2': <TbLayersIntersect2 />,
          'CgPathDivide': <CgPathDivide />,
          'RiSave3Fill': <RiSave3Fill />,
          'LuPrinter': <LuPrinter />,
          'GrDocumentConfig': <GrDocumentConfig />,
        }[iconName]
      }
    </>
  )
}

export default Icons
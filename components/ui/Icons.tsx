"use client";
import { IconsInterface } from "../../constants/interfaces";
import { BsVectorPen } from "react-icons/bs";
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
import { Icon } from "@iconify/react";

const Icons = ({iconName}: IconsInterface) => {
  return (
    <>
      {
        {
          'BsVectorPen': <BsVectorPen />,
          'IoShapesOutline': <IoShapesOutline />,
          'BsPen': <Icon icon="bi:pen" />,
          'PiNavigationArrow': <Icon icon="streamline:arrow-cursor-2" />,
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
          'MdOutlineVerticalAlignTop': <Icon icon="fluent:position-to-front-24-filled" />,
          'MdOutlineVerticalAlignBottom': <Icon icon="fluent:position-to-back-20-filled" />,
          'LuMoveUp': <Icon icon="fluent:position-forward-20-filled" />,
          'LuMoveDown': <Icon icon="fluent:position-backward-20-filled" />,
          'PiFlipHorizontal': <PiFlipHorizontal />,
          'PiFlipVertical': <PiFlipVertical />,
          'LuRotateCw': <LuRotateCw />,
          'LuRotateCcw': <LuRotateCcw />,
          'TbLayersUnion': <Icon icon="fluent:shape-union-16-regular" />,
          'TbLayersSubtract': <Icon icon="fluent:shape-subtract-20-regular" />,
          'TbLayersIntersect': <Icon icon="fluent:shape-intersect-16-regular" />,
          'TbLayersIntersect2': <Icon icon="fluent:shape-exclude-16-regular" />,
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
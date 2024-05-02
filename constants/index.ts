import {fabric} from 'fabric';

export const Tools = [
    {
        vector: "BsVectorPen",
        name: "Bezier curve",
        value: "bezier_curve"
    },
    {
        vector: "BsPen",
        name: "Freehand",
        value: "freehand"
    },
    {
        vector: "PiNavigationArrow",
        name: "Node tool",
        value: "node"
    },
    {
        vector: "IoShapesOutline",
        name: "Shapes",
        value: "bezier_curve",
        submenu: [
            {
                vector: "BiRectangle",
                name: "Rectangle",
                value: "rect",
            },
            {
                vector: "LuCircle",
                name: "Circle",
                value: "circle",
            },
            {
                vector: "LuTriangle",
                name: "Triangle",
                value: "triangle",
            },
        ]
    },
    {
        vector: "MdOutlineGradient",
        name: "Gradient",
        value: "gradient"
    },
    {
        vector: "TiImage",
        name: "Image",
        value: "image"
    },
    {
        vector: "IoHandRightOutline",
        name: "Move",
        value: "move"
    },
    {
        vector: "IoIosSearch",
        name: "Zoom",
        value: "zoom"
    },
    {
        vector: "IoTextOutline",
        name: "Text",
        value: "text",
        submenu: [
            {
                vector: "RiText",
                name: "Artistic text",
                value: "artistic_text",
            },
            {
                vector: "RiTextBlock",
                name: "Frame text",
                value: "frame_text",
            },
        ]
    },
    {
        vector: "IoCropSharp",
        name: "Crop",
        value: "crop"
    },
    {
        vector: "TbArrowsMoveVertical",
        name: "Move tool",
        value: "movetool",
        submenu: [
            {
                vector: "MdOutlineVerticalAlignTop",
                name: "Move to Front",
                value: "move_front",
            },
            {
                vector: "LuMoveUp",
                name: "Move Forward One",
                value: "move_forward_one",
            },
            {
                vector: "LuMoveDown",
                name: "Move Back One",
                value: "move_back_one",
            },
            {
                vector: "MdOutlineVerticalAlignBottom",
                name: "Move to Back",
                value: "move_back",
            },
        ]
    },
    {
        vector: "TbTransform",
        name: "Transform tools",
        value: "transform",
        submenu: [
            {
                vector: "PiFlipHorizontal",
                name: "Flip horizontal",
                value: "flip_horizontal",
            },
            {
                vector: "PiFlipVertical",
                name: "Flip vertical",
                value: "flip_vertical",
            },
            {
                vector: "LuRotateCw",
                name: "Rotate clockwise",
                value: "rotate_clockwise",
            },
            {
                vector: "LuRotateCcw",
                name: "Rotate anticlockwise",
                value: "rotate_anticlockwise",
            },
        ]
    },
    {
        vector: "LuCombine",
        name: "Combine tools",
        value: "transform",
        submenu: [
            {
                vector: "TbLayersUnion",
                name: "Add",
                value: "add_shapes",
            },
            {
                vector: "TbLayersSubtract",
                name: "Subtract",
                value: "subtract_shapes",
            },
            {
                vector: "TbLayersIntersect",
                name: "Intersect",
                value: "intersect_shapes",
            },
            {
                vector: "TbLayersIntersect2",
                name: "Xor",
                value: "xor_shapes",
            },
            {
                vector: "CgPathDivide",
                name: "Divide",
                value: "divide_shapes",
            },
        ]
    },
    {
        vector: "RiAlignItemLeftFill",
        name: "Alignment tools",
        value: "transform",
    }
];

export const ScaleControls = [
  {
    name: "tl",
    x: -0.5,
    y: -0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mt",
    x: 0,
    y: -0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
  },
  {
    name: "tr",
    x: 0.5,
    y: -0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mr",
    x: 0.5,
    y: 0,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
  },
  {
    name: "ml",
    x: -0.5,
    y: 0,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
  },
  {
    name: "bl",
    x: -0.5,
    y: 0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mb",
    x: 0,
    y: 0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
  },
  {
    name: "br",
    x: 0.5,
    y: 0.5,
    cursorStyle: 'crosshair',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
];
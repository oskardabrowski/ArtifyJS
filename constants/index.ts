import {fabric} from 'fabric';

export const Tools = [
    {
        vector: "BsVectorPen",
        name: "Bezier curve",
        value: "pen"
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
        vector: "BiRectangle",
        name: "Rectangle",
        value: "rect",
    },
    {
        vector: "LuCircle",
        name: "Ellipse",
        value: "ellipse",
    },
    {
        vector: "IoShapesOutline",
        name: "Shapes",
        value: "bezier_curve",
        submenu: [

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
        name: "Pan",
        value: "pan"
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
];

export const TopBarTools = [
    {
        type: 'part',
        tools: [
            {
                vector: "RiSave3Fill",
                name: "Save project",
                value: "save_project",
                submenu: undefined
            },
            {
                vector: "LuPrinter",
                name: "Print page",
                value: "print_page",
            },
            {
                vector: "GrDocumentConfig",
                name: "Document settings",
                value: "document_settings",
            },
        ]
    },
    {
        type: 'part',
        tools: [
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
        type: 'part',
        tools: [
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
        type: 'part',
        tools: [
            {
                vector: "RiAlignItemLeftFill",
                name: "Alignment tools",
                value: "transform",
            },
        ]
    },
    {
        type: 'part',
        tools: [
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
    }

]

export const ScaleControls = [
  {
    name: "tl",
    x: -0.5,
    y: -0.5,
    cursorStyle: 'nwse-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mt",
    x: 0,
    y: -0.5,
    cursorStyle: 'ns-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
  },
  {
    name: "tr",
    x: 0.5,
    y: -0.5,
    cursorStyle: 'nesw-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mr",
    x: 0.5,
    y: 0,
    cursorStyle: 'ew-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
  },
  {
    name: "ml",
    x: -0.5,
    y: 0,
    cursorStyle: 'ew-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
  },
  {
    name: "bl",
    x: -0.5,
    y: 0.5,
    cursorStyle: 'nesw-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
  {
    name: "mb",
    x: 0,
    y: 0.5,
    cursorStyle: 'ns-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
  },
  {
    name: "br",
    x: 0.5,
    y: 0.5,
    cursorStyle: 'nwse-resize',
    // @ts-ignore
    actionHandler: fabric.controlsUtils.scalingEqually,
  },
];
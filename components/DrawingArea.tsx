import { DrawingAreaCanvas } from "./ui/UiStyles"
import { DrawingInterface } from "../constants/interfaces"

const DrawingArea = ({drawingAreaRef}: DrawingInterface) => {
  return (
    <DrawingAreaCanvas>
        <canvas ref={drawingAreaRef} />
    </DrawingAreaCanvas>
  )
}

export default DrawingArea
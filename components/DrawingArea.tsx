import { DrawingAreaCanvas } from "./ui/UiStyles"
import { DrawingAreaInterface } from "../constants/interfaces"


const DrawingArea = ({drawingAreaRef}: DrawingAreaInterface) => {
  return (
    <DrawingAreaCanvas>
        <canvas ref={drawingAreaRef} />
    </DrawingAreaCanvas>
  )
}

export default DrawingArea
"use client";

import Bar from "./ui/Bar";
import ColorChooser from "./ui/ColorChooser";
import { BottomBars as RightBarStyle } from "./ui/UiStyles";

const RightBar = () => {

    return (
        <RightBarStyle style={{ position: 'absolute', top: '65px', right: '10px' }}>
            <Bar>
                <div>

                    <ColorChooser />

                    <div>Color chooser</div>

                    <div>Swatches</div>

                    <div>Stroke</div>


                </div>

                <div>

                    <div>Layers</div>

                    <div>Paragraph</div>

                </div>
            </Bar>
        </RightBarStyle>
    )
}

export default RightBar
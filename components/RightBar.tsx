"use client";

import Bar from "./ui/Bar";
import ColorChooser from "./ui/ColorChooser";

const RightBar = () => {

    return (
        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
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
        </div>
    )
}

export default RightBar
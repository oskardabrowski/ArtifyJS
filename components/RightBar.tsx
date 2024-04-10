"use client";

import Bar from "./ui/Bar";
import { useEffect, useRef } from "react";

const RightBar = () => {
    const pickerRef = useRef(null);

    useEffect(() => {
        // @ ts-ignore
        if(document.querySelector('#picker')) {
            var updatePreview = function(this: any) {
               var color = $(this).chromoselector('getColor');
               $(this).css({
                   'background-color': color.getHexString(),
                   'color': color.getTextColor().getHexString(),
                   'text-shadow': '0 1px 0 ' + color.getTextColor().getTextColor().getHexString()
               });
    }       ;
            // @ ts-ignore
            $('#color').chromoselector({
                target: '#picker',
                autoshow: false,
                width: 200,
                preview: false,
                resizable: false,
                create: updatePreview,
                update: updatePreview
            }).chromoselector('show', 0);
        }
    }, [])

    return (
        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
            <Bar>
                <div>

                    <div>

                        <form>
                          <div id="picker">
                            <input id="color" type="text" value="#80ff00" style={{ maxWidth: '200px' }} />
                          </div>
                        </form>

                    </div>

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
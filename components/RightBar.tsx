"use client";

import Bar from "./ui/Bar";
import { useEffect, useRef } from "react";

const RightBar = () => {
    const pickerRef = useRef(null);

    useEffect(() => {
        // @ ts-ignore
        if(document.querySelector('#picker')) {
            // @ ts-ignore
            $('#color').chromoselector({
                target: '#picker',
                autoshow: false,
                width: 200,
                preview: false,
                resizable: false,
                // create: updatePreview,
                // update: updatePreview
            }).chromoselector('show', 0);
        }
    }, [])

    return (
        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
            <Bar>
                <form>
                  <div id="picker">
                    <input id="color" type="text" hidden/>
                  </div>
                </form>
            </Bar>
        </div>
    )
}

export default RightBar
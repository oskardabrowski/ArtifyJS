"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

const ColorChooser = () => {
    const colorPickerRef = useRef(null);
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
            };
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
    <DefaultColorChooser>
        <div className="ColorChooserTop">
            <div>
                <div>Border</div>
                <div>Fill</div>
                <div>Picker</div>
            </div>
            <form>
              <div id="picker">
                <input id="color" type="text" defaultValue="#80ff00" style={{ display: 'none' }} />
              </div>
            </form>
        </div>
        <div className="ColorChooserBottom">

        </div>
    </DefaultColorChooser>
  )
}

const DefaultColorChooser = styled.div`
display: flex;
flex-direction: column;

.ColorChooserTop {
    display: flex;
}

`;

export default ColorChooser
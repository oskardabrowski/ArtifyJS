"use client";

import Bar from "./ui/Bar";
import { TopBar as TopBarStyle } from "./ui/UiStyles";

const TopBar = () => {
    return (
        <TopBarStyle style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <Bar style={{ height: '45px !important' }}>
                <span>TopBar</span>
            </Bar>
        </TopBarStyle>
    )
}

export default TopBar
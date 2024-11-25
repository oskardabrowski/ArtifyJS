import styled from "styled-components";

// ! Main colors
// * #141414
// * #1A1A1A
// * #1E40AF 30, 64, 175
// * #2563EB 37, 99, 235


export const MovableBar = styled.div`
    width: 100%;
    height: auto;
    padding: .35rem;
    background: #DFDFDF;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
        width: .35rem;
        height: .35rem;
        background: #B8B8B8;
        border-radius: 50%;
        margin: 0rem .15rem;
    }

    & > #picker {
        border: 1px solid;
        float: left;
        padding: 1em;
        background-color: #e4ccc1;
        margin: 1em;
    }
`;

export const MovableBarStyle = styled.div`
    background-color: #141414;
    padding: 0rem;
    border-radius: 5px;
    color: white;
    font-size: 1.25rem;
    /* box-shadow: 3px 3px 0px rgba(0,0,0, 1); */
    border: 1px solid white;
    min-height: 45px;

    /* background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px); */
    border: 1.5px solid rgba(30, 64, 175, 0.4);
`;

export const MovableBarStyleFlex = styled.div`
    background-color: #141414;
    padding: 0rem;
    border-radius: 5px;
    color: white;
    font-size: 1.25rem;
    display: flex;
    border: 1px solid white;
    min-height: 45px;
    border: 1.5px solid rgba(30, 64, 175, 0.4);
`;

export const ToolContainer = styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
`;

export const DrawingAreaCanvas = styled.div`
    width: 100%;
    height: 100dvh;
    & > canvas {
        width: 100%;
        height: 100dvh;
    }
`;

export const ToolSubmenu = styled.div`
    position: absolute;
    left: 100%;
    background-color: #141414;
    border: 2px solid black;
    border-radius: 5px;
    /* box-shadow: 3px 3px 0px rgba(0,0,0, 1); */
    width: max-content;
    transition: all .25s ease-in-out;
    color: white;

    /* background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px); */
    border: 1.25px solid rgba(30, 64, 175, 0.4);

    & > button {
        padding: .5rem 1.2rem .5rem 1.2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        backdrop-filter: blur(15px);
        &:hover {
            background: black;
            color: white;
        }
        & > span {
            padding-left: .5rem;
            font-size: .95rem;
        }
    }
`;

export const TopBar = styled.div`
    width: calc(100% - 20px);
    overflow: hidden;
`;
export const BottomBars = styled.div`
    & > div {
        height: calc(100dvh - 75px);
    }
`;

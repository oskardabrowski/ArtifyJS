import styled from "styled-components";

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
    background-color: white;
    padding: 0rem;
    border-radius: 5px;
    color: black;
    font-size: 1.25rem;
    box-shadow: 3px 3px 0px rgba(0,0,0, 1);
    border: 2px solid black;
`;

export const ToolContainer = styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
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
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    box-shadow: 3px 3px 0px rgba(0,0,0, 1);
    width: max-content;
    transition: all .25s ease-in-out;

    & > button {
        padding: .5rem 1.2rem .5rem 1.2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
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
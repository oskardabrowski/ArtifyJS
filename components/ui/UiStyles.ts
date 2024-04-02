import styled from "styled-components";

export const MovableBar = styled.div`
    width: 100%;
    height: auto;
    padding: .35rem;
    background: #52819D;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
        width: .35rem;
        height: .35rem;
        background: #7BB3CC;
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
    background-color: #2A536F;
    padding: 0rem;
    border-radius: 5px;
`;

export const ToolContainer = styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
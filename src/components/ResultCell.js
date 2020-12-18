import React from "react";
import styled from "styled-components";

export default function ResultCell({page, setPage, term, count}) {
    return (
        <Cell onClick={() => setPage(page + 1)}>
            <span>{term}</span>
            <span>{`${count} disciplinas`}</span>
        </Cell>
    );
}

const Cell = styled.div`
    display: flex;
    justify-content: space-between;        
    width:100%;
    height: 3rem;
    border-radius: 1.5rem;
    margin-bottom: 0.5rem;       
    background-color: rgba(255,255,255, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.45);
    cursor: pointer;

    span{
        display:flex;
        align-items:center;
        margin: 0 1rem;
    }
`;
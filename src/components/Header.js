import React from "react";
import styled from "styled-components";

export default function Header() {
    return (
        <>
            <TitleBox />                
            <Title>RepoProvas</Title>
        </>
    );
}

const TitleBox = styled.header`
    z-index: 2;
    display: flex;
    align-items:center;
    justify-content:center;
    position:absolute;       
    width:100%;
    height:14rem;
    left:3px;
    top: -60.05px;
    filter: blur(1.5px);
    background: linear-gradient(270.55deg, #AD5389 15.26%, #2D0053 99.41%);
    box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
    transform: rotate(1.97deg);    
`;

const Title = styled.h1`
    z-index: 9999;
    position: absolute;
    top:-2rem;
    left: calc(50vw - 13rem);
    font-family: var(--titleFont2);
    font-size: 5rem;    
`;
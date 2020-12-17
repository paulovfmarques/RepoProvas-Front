import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import leftImg from "../assets/img-bubbles-1.png";
import rightImg from "../assets/img-bubbles-2.png";

import StandardButton from "../components/Button";

export default function MenuPage() {
    return (
        <>
            <LeftImage src={leftImg} />
            <RightImage src={rightImg} />
            <MenuBox>
                <h2>
                    Bem-vindo ao<br/>nosso repositório!
                </h2>
                <BtnContainer>
                    <Link to="/search-file">
                        <StandardButton>Consultar Provas</StandardButton>
                    </Link>
                    <Link to="/add-file">
                        <StandardButton>Upload de Provas</StandardButton>
                    </Link>
                </BtnContainer>                
            </MenuBox>
        </>
    );
}

const LeftImage = styled.img`
    position:absolute;
    bottom:0;
    left:0;
`;

const RightImage = styled.img`
    position:absolute;
    bottom:0;
    right:0;
`;

const MenuBox = styled.div`
    position: absolute;
    top: calc(50vh - 10rem);
    left: calc(50vw - 15rem);
    width: 30rem;
    height:30rem;
    border-radius: 2.5rem;
    background-color: rgba(255,255,255, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.45);

    h2{
        width:100%;
        text-align:center;
        font-size: 2.2rem;         
    }
`;

const BtnContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding-top:4rem;

    button{
        margin-bottom: 2rem;        
        font-size: 1.1rem;
    }
`;
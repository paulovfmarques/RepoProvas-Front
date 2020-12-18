import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import StandardButton from "./Button";

export default function ReturnButton({loading = false}) {

    const history = useHistory();
    
    const goBack = () => {
        if(loading) return;        
        history.push("/");
    }

    return (
        <BtnContainer onClick={() => goBack()}>                    
            <StandardButton>
                Voltar
            </StandardButton>                    
        </BtnContainer>
    );
}

const BtnContainer = styled.div`    
    width:100%;
    display:flex;
    justify-content:flex-end;
    
    button{
        z-index: 999;
        position:absolute;
        top: 1rem;
        right: 2rem;
        display:flex;
        align-items:center;
        justify-content:center;
        width: 5rem;
        height: 0.5rem;        
    }
`;
import React from "react";
import styled from "styled-components";

export default function StandardButton(props) {
    return (
        <Button>
            {props.children}
        </Button>        
    );
}

const Button = styled.button`
    background-color: var(--buttonColor);
    width:13rem;
    padding:0.8rem;
    border-radius: 1.5rem;
    border:none;
    outline:none;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    color: white;
`;
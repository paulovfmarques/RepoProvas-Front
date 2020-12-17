import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import addFileImg from "../assets/add-file.png";
import StyledForm from "../components/StyledForm";
import StandardButton from "../components/Button";

export default function AddFilePage() {
  
    const [loading, setLoading] = useState(false);
    const [uploadMsg, setUploadMsg] = useState(false);
    const [databaseInfo, setDatabaseInfo] = useState("");

    const fetchInfo = async () => {
        try{
            const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch/database-info`);
            setDatabaseInfo(resp.data)
            console.log(resp.data)
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => fetchInfo(),[]);

    const history = useHistory();
    
    const goBack = () => {
        if(loading) return;        
        history.push("/");
    }


    return (
        <>
            <AddFormBox>

                <BtnContainer onClick={() => goBack()}>                    
                    <StandardButton>
                        Voltar
                    </StandardButton>                    
                </BtnContainer>

                <h2>Adicionar Prova ao Repositório</h2>
                <AddFileImg src={addFileImg}/>
                {databaseInfo && (
                    <StyledForm
                        databaseInfo = {databaseInfo}
                        loading = {loading}
                        setLoading = {setLoading}
                        setUploadMsg = {setUploadMsg}
                    />
                )}
                
                {
                    uploadMsg ? (
                        <p>Upload completo!</p>
                    ) : ("")
                }                              
            </AddFormBox>
        </>
    );
}

const AddFormBox = styled.div`
    position: absolute;
    top: calc(50vh - 15rem);
    left: calc(50vw - 35rem);
    width: 70rem;
    height:40rem;
    border-radius: 2.5rem;
    background-color: rgba(255,255,255, 0.2);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.45);

    & > p{
        width:100%;
        text-align:center;
    }

    h2{
        width:100%;
        text-align:center;
        font-size: 2.2rem;         
    }
`;

const AddFileImg = styled.img`
    position:absolute;
    top:10rem;
    left: 1rem;
`;

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
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import StandardButton from "./Button";

export default function StyledForm({value}) {
    const {loading, setLoading, setUploadMsg} = value;
    const [databaseInfo, setDatabaseInfo] = useState("")
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("");
    const [professor, setProfessor] = useState("");
    const [url, setUrl] = useState("");

    const clearValues = () => {
        setTitle("")
        setSubject("")
        setCategory("")
        setProfessor("")
        setUrl("")
    };

    const dataObj = {
        title,
        subject,
        category,
        professor,
        url
    };    

    const fetchInfo = () => {
        clearValues();
        
        axios.get(`${process.env.REACT_APP_BACKURL}/api/database-info`)
        .then(({data}) => {
            setDatabaseInfo(data)
        })
        .catch(err => console.log(err))
    };

    const sendInfo = () => {
        axios.post(`${process.env.REACT_APP_BACKURL}/api/database-info`,dataObj)
        .then(() => {
            clearValues();
            setLoading(false);
            setTimeout(() => {
                setUploadMsg(false);
            },2000);
        })
        .catch(err => console.log(err))
    };

    // useEffect(fetchInfo(),[]);


    //DELETAR DEPOIS
    const profArr = [{id:1, professor: "Professor Leôncio"}];
    const subjectsArr = [{id:1, materia: "Termodinâmica"}];
    const categoryArr = [{id:1, categoria: "P1"}];

    const submitHandler = (event) => {
        event.preventDefault()
        setUploadMsg(true);
        setLoading(true);

        //sendInfo();
    };

    return (
        <>
            <Form id="add-form" onSubmit={(e) => submitHandler(e)}>
                <h3>Preencha as informações corretamente</h3>
                <div className="smaller-input-container">
                    <div>
                        <label htmlFor="name">Título</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required id="name"/>
                    </div>
                    <div>
                        <label htmlFor="subject">Disciplina</label>
                        <select 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        required 
                        id="subject"
                        >
                            <option value="" hidden>Selecione</option>
                            {
                                subjectsArr.map(subj => {
                                    return(
                                        <option key={subj.id} value={subj.materia}>{subj.materia}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="smaller-input-container">
                    <div>
                        <label htmlFor="category">Categoria</label>
                        <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required 
                        id="category"
                        >
                            <option value="" hidden>Selecione</option>
                            {
                                categoryArr.map(categ => {
                                    return(
                                        <option key={categ.id} value={categ.categoria}>{categ.categoria}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="professor">Professor</label>
                        <select 
                        value={professor} 
                        onChange={(e) => setProfessor(e.target.value)} 
                        required 
                        id="professor"
                        >
                            <option value="" hidden>Selecione</option>
                            {
                                profArr.map(prof => {
                                    return(
                                        <option key={prof.id} value={prof.professor}>{prof.professor}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

                <div id="url-input">
                    <label htmlFor="link">URL</label>
                    <input type="url" value={url} onChange={e => setUrl(e.target.value)} required id="link"/>
                </div>
                <BtnContainer>                    
                    <StandardButton disable={loading} form="add-form" type="submit">
                        {loading ? "Enviando..." : "Fazer Upload"}
                    </StandardButton>
                </BtnContainer>
            </Form>
        </>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items:flex-start;    
    width:calc(100% - 35rem);
    margin-left:25rem;    
        
    h3{
        width:100%;
        text-align:center;
    }

    input, select{
        height:2.2rem;
        border-radius:0.5rem;            
        background-color: rgba(255,255,255,0.20);
        outline: none;
        border: 0.5px solid var(--buttonColor);
        font-size: 0.9rem;
        padding-left: 0.5rem;
    }

    #url-input{
        display:flex;
        flex-direction: column;
        width: 32rem;
        margin-left: 1.5rem;
        margin-top: 1.5rem;
    }

    .smaller-input-container{
        width:100%;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 3rem;

        div{
            display:flex;
            flex-direction:column;            
            justify-content: center;
        }

        input, select{
            width: 15rem;            
        }
    }
`;

const BtnContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    padding-top: 5rem;    

    button{
        font-size: 1rem;
    }
`;
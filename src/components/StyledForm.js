import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import StandardButton from "./Button";

export default function StyledForm({ databaseInfo, loading, setLoading, setUploadMsg }) {   

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

    const sendInfo = () => {
        axios.post(`${process.env.REACT_APP_BACKURL}/api/upload/exam-info`,dataObj)
        .then(() => {
            clearValues();
            setLoading(false);
            setUploadMsg(true);
            setTimeout(() => {
                setUploadMsg(false);
            },2000);
        })
        .catch(err => console.log(err))
    };       

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        sendInfo();
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
                            {databaseInfo && databaseInfo.subjects.map(subj => {
                                return(
                                    <option key={subj.id} value={subj.name}>{subj.name}</option>
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
                            {databaseInfo && databaseInfo.category.map(categ => {
                                return(
                                    <option key={categ.id} value={categ.category}>{categ.category}</option>
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
                            {subject === "" ? (
                                databaseInfo.professors.map(prof => {                                
                                    return(
                                        <option key={prof.id} value={prof.name}>{prof.name}</option>
                                    );
                                })
                                ) : (
                                databaseInfo.professors.map(prof => {
                                    let subjectId = 0;
                                    databaseInfo.subjects.map(sub => {
                                        if(sub.name === subject) return subjectId = sub.id;
                                    })                                    

                                    let professorIdArr = [];
                                    databaseInfo.profClass.map(p => {
                                        if(p.subject_id === subjectId) return professorIdArr.push(p.professor_id);
                                    });                                    

                                    if(professorIdArr.includes(prof.id)){
                                        return(
                                            <option key={prof.id} value={prof.name}>{prof.name}</option>
                                        );
                                    }
                                })
                            )}
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
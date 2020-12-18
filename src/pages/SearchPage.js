import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import searchImg from "../assets/search-file.png";
import ResultCell from "../components/ResultCell";
import ReturnButton from "../components/ReturnButton";
import StandardButton from "../components/Button";

export default function SearchPage() {
    const [selected, setSelected] = useState("");
    const [page, setPage] = useState(1);
    const [subjectsData, setSubjectsData] = useState("");

    console.log(page)

    async function selectHandler() {
        if(selected === "subject"){
            try{
                const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch/subjects`);
                console.log(resp.data);
                setSubjectsData(resp.data);
            }catch(err){
                console.log(err)
            }
        }else if(selected === "professor"){
            console.log("work in progress")
        }
    }

    useEffect(() => selectHandler(),[selected])
    
   

    return (
        <>
            <MenuBox>
                <SearchOptions>
                    <ReturnButton />
                    <h2>Consultar Provas</h2>
                    <form>
                        <div>                        
                            <input 
                            id="per-professor" 
                            value="professor" 
                            onClick={(e) => setSelected(e.target.value)} 
                            type="radio" 
                            name="search-input"/>
                            <label htmlFor="per-professor">Por professor</label>
                        </div>
                        <div>
                            <input 
                            id="per-subject"
                            value="subject"                             
                            onClick={(e) => setSelected(e.target.value)} 
                            type="radio" 
                            name="search-input"/>
                            <label htmlFor="per-subject" >Por disciplina</label>
                        </div>
                    </form>                    
                </SearchOptions>
                <SearchResultBox>
                    {selected === "subject" ? (
                        page === 1 ? (
                            subjectsData && subjectsData.subjectsPerTerm.map(subj => {
                                return <ResultCell
                                page={page} 
                                setPage={setPage}
                                key={subj.term_name} 
                                term={subj.term_name} 
                                count={subj.count}/>
                            })
                        ) : page === 2 ? (
                            subjectsData && subjectsData.examsPerSubject.map(subj => {
                                return <ResultCell 
                                page={page} 
                                setPage={setPage} 
                                key={subj.subject_name} 
                                term={subj.subject_name} 
                                count={subj.count}/>
                            })
                        ) : page === 3 ? (
                            subjectsData && subjectsData.examsPerCategory.map(subj => {
                                return <ResultCell 
                                page={page} 
                                setPage={setPage} 
                                key={subj.category_name} 
                                term={subj.category_name} 
                                count={subj.count}/>
                            })
                        ) : (
                            ""
                        )
                    ) : selected === "professor" ? (
                        page === 1 ? (
                            subjectsData && subjectsData.subjectsPerTerm.map(subj => {
                                return <ResultCell key={subj.term_name} term={subj.term_name} count={subj.count}/>
                            })
                        ) : page === 2 ? (
                            ""
                        ) : page === 3 ? (
                            ""
                        ) : (
                            ""
                        )
                    ) : (
                        <p>Selecione um modo de busca</p>
                    )
                    }                    
                </SearchResultBox>
                <ReturnSearch onClick={() => {
                    if(page === 1) return;
                    setPage(page - 1);
                }}>
                    {'<'}
                </ReturnSearch>
                <SearchFileImg src={searchImg}/>
            </MenuBox>
        </>
    );
}

const ReturnSearch = styled.button`
    z-index: 999;
    position:absolute;
    bottom:0.8rem;
    left:32.5rem;
    background-color: var(--buttonColor);
    width:5rem;
    border-radius: 1.5rem;
    border:none;
    outline:none;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    font-size:1.5rem;
    color: white;    
`;

const SearchResultBox = styled.div`
    position: absolute;
    display:flex;
    flex-direction:column;
    top: 1.25rem;
    left: 22.5rem;
    width: 25rem;
    height:35rem;
    border-radius: 0.5rem;
    border: 1px solid var(--buttonColor);
    overflow-y:auto;

    p{
        margin-top:1rem;
        width:100%;
        text-align:center;
    }

    &::-webkit-scrollbar{        
        width:0.5rem;        
    }

    &::-webkit-scrollbar-track{        
        border-radius: 0.5rem;
        background-color: rgba(255,255,255, 0.2);
    }
    &::-webkit-scrollbar-thumb{
        background-color: white;
        border-radius: 0.5rem;
    }
    
`;

const MenuBox = styled.div`
    position: relative;
    display:flex;
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
        font-size: 2rem;         
    }
`;

const SearchFileImg = styled.img`
    position:absolute;
    bottom:0rem;
    right: 2rem;
`;

const SearchOptions = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
    width:20rem;    

    form{
        div{
            margin-bottom: 1rem;
        }
    }

    label{
        font-size: 1.4rem;
        margin-left:1rem;        
    }
`;
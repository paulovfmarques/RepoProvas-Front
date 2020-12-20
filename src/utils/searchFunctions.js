import axios from "axios";

//SEARCH BY SUBJECTS
export async function fetchSubjectsPerTerm(id,setData) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-subject/subjects`,{params: id});
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};

export async function fetchCagories(id,setData) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-subject/categories`,{params: id});
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};

export async function fetchExams(id,setData) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-subject/exams`,{params: id});
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};

//SEARCH BY PROFESSORS

export async function fetchProfessorCategories(id,setData) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-professor/categories`,{params: id});
        console.log(resp.data);
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};

export async function fetchProfessorExams(id,setData) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-professor/exams`,{params: id});
        console.log(resp.data);
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
}
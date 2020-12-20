import axios from "axios";

export async function fetchBySubject(id = null,setData,type) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-subject/${type}`,{params: id});
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};

export async function fetchByProfessor(id = null,setData,type) {
    try{
        const resp = await axios.get(`${process.env.REACT_APP_BACKURL}/api/fetch-by-professor/${type}`,{params: id});        
        setData(resp.data);
    }catch(err){
        console.log(err)
    }
};
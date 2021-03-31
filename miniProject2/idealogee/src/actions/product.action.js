import axios from "../helpers/axios";

export const addProduct= form=>{
    console.log("axios");
    return async dispatch=>{
        const res=await axios.post(`/product/create`,form);
        console.log(res);
    }
}
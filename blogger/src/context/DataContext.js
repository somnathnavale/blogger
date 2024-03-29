import { createContext, useState,useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext=createContext({});

export const DataProvider=({children})=>{

    const [posts,setPosts]=useState([]);
    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults]=useState([]);
    const {data,fetchError, isLoading}=useAxiosFetch('/posts') //localhost

    useEffect(()=>{
        setPosts(data)
    },[data])

    useEffect(()=>{
        const filteredResults=posts.filter(post=>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        );
        setSearchResults(filteredResults);
    },[posts,search])

    return(
        <DataContext.Provider value={{
            search,setSearch,
            posts,setPosts,searchResults,fetchError,isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
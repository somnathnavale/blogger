import { createContext, useState,useEffect } from "react";
// import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../api/posts'
const DataContext=createContext({});

export const DataProvider=({children})=>{

    const [posts,setPosts]=useState([]);
    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults]=useState([]);
    const [fetchError,setFetchError]=useState(null);
    const [isLoading ,setIsLoading]=useState(false);
    // const {data,fetchError, isLoading}=useAxiosFetch('/posts') //localhost

    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const response=await api.get('/posts');
                console.log(response.data)
                setPosts(response.data); 
            } catch (error) {
                setFetchError(error.message)
            }finally{
                isLoading(false);
            }
            fetchPosts();
        }
    },[])

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
import React,{useContext, useEffect,useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import {format} from 'date-fns';
import { useNavigate} from 'react-router-dom';
import api from './api/posts';
import DataContext from './context/DataContext';

const EditPost = () => {
    const [editTitle,setEditTitle]=useState('');
    const [editBody,setEditBody]= useState('');
    const {posts,setPosts}=useContext(DataContext);
    const navigate=useNavigate();

    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody])
    
    const handleEdit=async(id)=>{
        const dateTime=format(new Date(), 'MMMM dd yyyy pp');
        const updatedPost={id,title:editTitle,body:editBody,dateTime};
        try{
            const response=await api.put(`/posts/${id}`,updatedPost);
            setPosts(posts.map((post)=>post.id===id ? response.data : post));
            setEditBody('');
            setEditTitle('');
            navigate('/');
        }catch(err){
            console.log(`Error: ${err.message}`);
        }
    }
    return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form action="" className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="postTitle">Title</label>
                    <input
                        id='postTitle'
                        type='text'
                        required
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea 
                        id="postBody" 
                        cols="30" 
                        rows="10"
                        required
                        value={editBody}
                        onChange={(e)=>setEditBody(e.target.value)}
                    >
                    </textarea>
                    <button type='submit' onClick={()=>handleEdit(post.id)} className="submit">Submit</button>
                </form>
            </>
        }
        {!editTitle &&
            <>
                <h3>Post not found</h3>
                <p>That's Disappointing, for similar post checkout our homepage </p>
                <p><Link to='/'>Visit Our HomePage</Link></p>
            </>
        }
    </main>
    );
};

export default EditPost;

import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import { useNavigate} from 'react-router-dom';
import DataContext from './context/DataContext';

const NewPost = () => {
  
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]= useState('');
  const {posts,setPosts}=useContext(DataContext);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length-1].id +1 : 1;
    const dateTime=format(new Date(), 'MMMM dd yyyy pp');
    const newPost={
    id,
    title:postTitle,
    body:postBody,
    dateTime
    }
    try{
        const response=await api.post('/posts',newPost)
        const updatedPost=[...posts,response.data];
        setPosts(updatedPost);
        setPostTitle('');
        setPostBody('');
        navigate('/')
    }catch(err){
        console.log(`Error: ${err.message}`);
    }
  }
 
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form action="" className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input
          id='postTitle'
          type='text'
          required
          value={postTitle}
          onChange={(e)=>setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id="postBody" 
          cols="30" 
          rows="10"
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
        >
        </textarea>
        <button type='submit' className='submit'>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;

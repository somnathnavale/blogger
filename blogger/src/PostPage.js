import React, { useContext } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import api from './api/posts';


const PostPage = () => {
  const {posts,setPosts}=useContext(DataContext);
  const { id }=useParams();
  const navigate=useNavigate();  

  const handleDelete=async(id)=>{
    try{
        await api.delete(`/posts/${id}`)
        const postList=posts.filter(post=>post.id!==id);
        setPosts(postList);
        navigate('/');
    }catch(err){
        console.log(err.message);
    }
  }

  
  const post=posts.find(post=>(post.id).toString()===id)
  
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
        <> 
          <h2>{post.title}</h2>
          <p className='postDate'>{post.dateTime}</p>
          <p className="postBody">{post.body}</p>
          <button onClick={()=>handleDelete(post.id)} className='delete'>Delete Post</button>
          <Link to={`/edit/${post.id}`}><button className='edit'>Edit Post</button></Link>
        </>
        }
        {!post &&
        <>
          <h3>Post not found</h3>
          <p>That's Disappointing, for similar post checkout our homepage </p>
          <p><Link to='/'>Visit Our HomePage</Link></p>
        </>
          }
      </article>
    </main>
  );
};

export default PostPage;

import React from 'react';
import { useParams,Link } from 'react-router-dom';

const PostPage = ({posts,handleDelete}) => {
  const { id }=useParams();
  
  const post=posts.find(post=>(post.id).toString()===id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
        <> 
          <h2>{post.title}</h2>
          <p className='postDate'>{post.dateTime}</p>
          <p className="postBody">{post.body}</p>
          <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
          <Link to={`/edit/${post.id}`}><button style={{backgroundColor:"green",marginLeft:"20px"}}>Edit Post</button></Link>
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

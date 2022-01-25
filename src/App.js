import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost';
import About from './About'
import Missing from './Missing'
import {Route , Routes , useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/posts';

function App() {

  const [posts,setPosts]=useState([]);
  const [search,setSearch]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]= useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]= useState('');
  const navigate=useNavigate();

  useEffect(()=>{

    const fetchPosts = async()=>{
      try{
        const response=await api.get('/posts');
        setPosts(response.data);  
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log('error',err.message);
        }
      }
    }

    fetchPosts()

  },[])

  useEffect(()=>{
    const filteredResults=posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  },[posts,search])

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
    <Routes>
      <Route path='/' element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home 
          posts={searchResults}
        />} />

        <Route path='post'>
          <Route index element={<NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />}/>
        
          <Route path=':id' element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route> 
        <Route path='/edit/:id' element={<EditPost
          posts={posts}
          editTitle={editTitle}
          editBody={editBody}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />}/> 
        <Route path='about' element={<About />}/>
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

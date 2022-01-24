import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import {Route , Routes , useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {format} from 'date-fns';

function App() {

  const [posts,setPosts]=useState([
    {
      id:1,
      title:"My first Post",
      dateTime:"July 01, 2021 11:17:36 AM",
      body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cum corporis ullam recusandae accusantium ipsum fugiat inventore. Consequatur, repellendus sequi!"
    },
    {
      id:2,
      title:"My Second Post",
      dateTime:"July 01, 2021 11:17:36 AM",
      body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cum corporis ullam recusandae accusantium ipsum fugiat inventore. Consequatur, repellendus sequi!"
    },
    {
      id:3,
      title:"My Third Post",
      dateTime:"July 01, 2021 11:17:36 AM",
      body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cum corporis ullam recusandae accusantium ipsum fugiat inventore. Consequatur, repellendus sequi!"
    },
    {
      id:4,
      title:"My Fourth Post",
      dateTime:"July 01, 2021 11:17:36 AM",
      body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cum corporis ullam recusandae accusantium ipsum fugiat inventore. Consequatur, repellendus sequi!"
    }
  ]);

  const [search,setSearch]=useState('');
  const [searchResults,setSearchResults]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]= useState('');
  const navigate=useNavigate();

  const handleDelete=(id)=>{
    const postList=posts.filter(post=>post.id!==id);
    setPosts(postList);
    navigate('/');
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length-1].id +1 : 1;
    const dateTime=format(new Date(), 'MMMM dd yyyy pp');
    const newPost={
      id,
      title:postTitle,
      body:postBody,
      dateTime
    }
    console.log(newPost);
    const updatedPost=[...posts,newPost];
    setPosts(updatedPost);
    setPostTitle('');
    setPostBody('');
    navigate('/')
  }

  return (
    <Routes>
      <Route path='/' element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home 
          posts={posts}
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

        <Route path='about' element={<About />}/>
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

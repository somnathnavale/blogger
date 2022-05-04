import React,{useContext} from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';

const Home = () => {
  const {searchResults,fetchError,isLoading}=useContext(DataContext);
  
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts....</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
      {!fetchError && !isLoading &&
        (searchResults.length ? (<Feed posts={searchResults} />)
        :<p style={{marginTop:'2rem'}}> No posts available</p>)
      }
    </main>
  );
};

export default Home;

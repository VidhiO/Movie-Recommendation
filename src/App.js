import React , {useEffect, useState} from 'react';
import MovieList from './Components/MovieList';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBar';
import AddFav from './Components/AddFav';


const App =()=>{
  const [movies,setMovies]=useState([]) ;
  const[fav,setFav]=useState([]);
  const[searchValue , setSearchValue ] = useState('');

  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6d6d4c87`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search)
    {
    setMovies(responseJson.Search);
    }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFav = JSON.parse(localStorage.getItem('react-movie-app-fav'));

    setFav(movieFav);
  },[])

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-fav',JSON.stringify(items));
  };

  const addFavMovie = (movie) =>{
    const newFavList = [...fav,movie];
    setFav(newFavList);
    saveToLocalStorage(newFavList);
  }

  const removeFavMovie=(movie) =>{
    const newFavList = 
    fav.filter((f)=>
    f.imdbID!== movie.imdbID);
    setFav(newFavList);
    saveToLocalStorage(newFavList);
  }

  return (
    <div>
      <div className='d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies' />
        <SearchBox 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        />
      </div>
      <div className='container-fluid py-2 movie-app'>
        <div className='d-flex flex-row flex-nowrap'>
          <MovieList 
          movies = {movies} 
          fav={AddFav} 
          handleFavClick={addFavMovie}/>
        </div>
      </div>
      <div className='d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Favourites' />  
      </div>
      <div className='container-fluid py-2 movie-app'>
        <div className='d-flex flex-row flex-nowrap'>
          <MovieList 
          movies = {fav} 
          fav={AddFav} 
          handleFavClick={removeFavMovie}/>
        </div>
      </div>
    </div>
    
  )
}

export default App;

import React from 'react';
import './MovieList.css';

const MovieList = (props) => {
    const Fav = props.fav;
    return (
        <>
        {props.movies.map((movie,index)=>
        <div className='image-container d-flex justify-content-start movie'>
            <img 
            src={movie.Poster} 
            alt = " img">
            </img>
            <div 
            onClick={()=>props.handleFavClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'>
              <Fav />  
            </div>
        </div>
        )}
        
        </>
    )
}

export default MovieList;
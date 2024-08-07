import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'


const TitleCards = ({url , category , color}) => {

  const [apiData , setApiData] = useState([])

  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDZmY2ZlOWRkZTcwN2M5NzgxOWI1NmQyZDQzMDQ4ZSIsIm5iZiI6MTcyMDg1MDkwMy4yOTY5MjEsInN1YiI6IjY2OGMxNDdlOWU5MjNlZjQ1MDYyYzBjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8MHzcPOflAAZTvEJVUOrMlJPSiab1qiwlN8TwSAJvwU'
    }
  };

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{

    fetch(url)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel' , handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h1 style={{color:color}}>{category?category:'Popular on Netflix'}</h1>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

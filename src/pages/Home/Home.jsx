import React, { useEffect, useState }  from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import endpoints, { CreateImageUrl } from '../../Services/MovieServices'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [movie, setMovie] = useState({})

  useEffect(()=>{
    axios.get(endpoints.popular).then(response=>{
      const movies = response.data.results;
            const randomMovies = movies[Math.floor(Math.random() * movies.length)]
            setMovie(randomMovies)
    }).catch(err=>alert(err))
  },[])

  const truncate = (str,length)=>{
    if(!str) return ""
    return str.length>length ? str.slice(0,length)+'...' : str
  }
console.log(movie)
  const {title , backdrop_path , release_date, overview} = movie

  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={CreateImageUrl(backdrop_path,'original')} alt="" className='banner-img' />
        <div className="hero-caption">
          <h1 className='custom-title'>{title}</h1>
          <p>{release_date}</p>
          <p className='hero-overview'>{truncate(overview,165)}</p>        
          <div className="hero-btns">
            <Link to={`/player/${movie.id}`}>
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            </Link>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More info</button>
          </div>

          <TitleCards url={endpoints.trending} category={'Trending Now'} color={'white'}/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards url={endpoints.topRated} category={'Top_rated'} color={'red'}/>
        <TitleCards url={endpoints.popular} category={'Popular on Netflix'} color={'white'}/>
        <TitleCards url={endpoints.upcoming} category={'Upcoming'} color={'white'}/>
        <TitleCards url={endpoints.comedy} category={'Comedy'} color={'white'}/>
      </div>
      <Footer />
    </div>
  )
}

export default Home

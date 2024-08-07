
const apiKey='146fcfe9dde707c97819b56d2d43048e';


const baseUrl = "https://api.themoviedb.org/3"

const endpoints ={
   
    popular: `${baseUrl}/movie/popular?api_key=${apiKey}`, 
    topRated: `${baseUrl}/movie/top_rated?api_key=${apiKey}`,      
    trending: `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=2`,  
    comedy: `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=comedy&page=1&include_adult=false`,      
    upcoming: `${baseUrl}/movie/upcoming?api_key=${apiKey}`  
};

export function CreateImageUrl(filename, size){
    return `https://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoints
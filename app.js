//Initial Values
const API_KEY = 'b89b932a523c0acc723fde5bdc9e2ae6';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=b89b932a523c0acc723fde5bdc9e2ae6';

// Selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');


function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=b89b932a523c0acc723fde5bdc9e2ae6`;
    return url; 
}


function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
        return `<img  
             src=${IMAGE_URL + movie.poster_path} 
             data-movie-id=${movie.id}
          />`;
        }
    })
}


function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
    <section class="section"> 
    ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement; 

}

function renderSearchMovies(data) {
  // data.results []
movieSearchable.innerHTML = '';
const movies = data.results;
const movieBlock = createMovieContainer(movies);
movieSearchable.appendChild(movieBlock);
console.log('Data: ', data);
}

buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;;

    fetch(newUrl)
       .then((response) => response.json())
       .then(renderSearchMovies)
       .catch((error) => {
           console.log('Error: ', error);
       })   

    inputElement.value = '';
    console.log('Value: ', value);
     

}

document.onclick = function(event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        console.log('Hello World');
        console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId); 
        const section  = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');


    //     const path = `/movie/${movie_id}/videos`;
    //     const url = generateUrl(path); 
    //     //fetch movie videos
    //     fetch(url)
    //       .then((response) => response.json())
    //       .then((data) => {
    //           // TODO
    //           // display movie videos
    //           console.log('Videos: ', data);
    //       })
    //       .catch((error) => {
    //          console.log('Error: ', error);
    //    })   
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');


    }
    
}
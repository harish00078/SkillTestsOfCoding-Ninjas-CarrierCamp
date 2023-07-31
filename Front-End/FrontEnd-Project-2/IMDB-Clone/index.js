const apiKey = '1b1b60c0';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const quoteText = document.getElementById('quoteText');

// Function to search for movies
async function searchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Function to add a movie to favourites
async function addToFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const movie = await getMovieDetails(imdbID);
    if (movie) {
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favouritesList.some(m => m.imdbID === movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} has been added to your favourites!`);
        } else {
            alert(`${movie.Title} is already in your favourites!`);
        }
    }
}

// Function to display search results on the index.html page
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card', 'col-md-4', 'mb-4');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <button class="btn btn-primary btn-sm favourite-button" data-imdbid="${movie.imdbID}">Add to Favourites</button>
                <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">More</a>
            </div>
        `;
        searchResultsContainer.appendChild(movieCard);
    });
}

// Event listener for the Search Button
searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        searchMovies(query)
            .then(results => {
                displaySearchResults(results);
                // Store the search results in LocalStorage
                localStorage.setItem('searchResults', JSON.stringify(results));
            })
            .catch(error => console.error('Error searching movies:', error));
    }
});

// Function to get movie details by IMDb ID
async function getMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

// Function to display the quotation word by word
async function displayQuoteWordByWord() {
    const quote = movieQuotations[currentQuoteIndex];
    const words = quote.split(' ');

    for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, quoteSpeed));
        quoteText.textContent = words.slice(0, i + 1).join(' ');
    }

    // After displaying all words, wait for 10 seconds and then show the next quote
    await new Promise(resolve => setTimeout(resolve, 800));
    showNextQuote();
}

// Function to show the next quotation
function showNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % movieQuotations.length;
    displayQuoteWordByWord();
}

// Display the first quotation on page load
displayQuoteWordByWord();

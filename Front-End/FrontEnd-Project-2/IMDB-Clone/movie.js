

// Get the IMDb ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('id');
const apiKey = '1b1b60c0';

// Function to fetch and display movie details
async function displayMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieDetailsContainer = document.getElementById('movieDetails');
            movieDetailsContainer.innerHTML = `
                <div class="card">
                    <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
                    <div class="card-body">
                        <h3 class="card-title">${data.Title}</h3>
                        <p class="card-text"><strong>Year:</strong> ${data.Year}</p>
                        <p class="card-text"><strong>Director:</strong> ${data.Director}</p>
                        <p class="card-text"><strong>Actors:</strong> ${data.Actors}</p>
                        <p class="card-text"><strong>Plot:</strong> ${data.Plot}</p>
                    </div>
                </div>
            `;
        } else {
            // Display an error message if movie details cannot be fetched
            const movieDetailsContainer = document.getElementById('movieDetails');
            movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
        }
    } catch (error) {
        // Handle any errors that may occur during API call
        console.error('Error fetching movie details:', error);
        const movieDetailsContainer = document.getElementById('movieDetails');
        movieDetailsContainer.innerHTML = '<p>Oops! Something went wrong. Please try again later.</p>';
    }
}

// Call the function to display movie details
displayMovieDetails(imdbID);

// Function to fetch and display the list of favorite movies
async function displayFavoriteMovies() {
  try {
    // Fetch favorite movies from LocalStorage or API, if needed
    const favoritesList = JSON.parse(localStorage.getItem("favourites")) || [];

    // Cache the list of favorite movies in memory
    const cachedFavoritesList = favoritesList;

    // Call the function to render the favorite movies
    renderFavoriteMovies(cachedFavoritesList);
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error fetching favorite movies:", error);
    const favouritesListContainer = document.getElementById("favouritesList");
    favouritesListContainer.innerHTML =
      "<p>Oops! Something went wrong. Please try again later.</p>";
  }
}

// Function to render the favorite movies list
function renderFavoriteMovies(movies) {
  const favouritesListContainer = document.getElementById("favouritesList");
  if (movies.length > 0) {
    // Generate and display the favorite movies list using template literals
    const moviesHtml = movies
      .map(
        (movie) => `
            <div class="card col-md-4 mb-4">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm">More</a>
                </div>
            </div>
        `
      )
      .join("");

    favouritesListContainer.innerHTML = moviesHtml;
  } else {
    // Display a message if there are no favorite movies
    favouritesListContainer.innerHTML = "<p>No favorite movies added yet.</p>";
  }
}

// Function to add a movie to the favorite movies list
function addFavoriteMovie(movie) {
  const favoritesList = JSON.parse(localStorage.getItem("favourites")) || [];
  favoritesList.push(movie);
  localStorage.setItem("favourites", JSON.stringify(favoritesList));
  displayFavoriteMovies();
}

// Function to remove a movie from the favorite movies list
function removeFavoriteMovie(movie) {
  const favoritesList = JSON.parse(localStorage.getItem("favourites")) || [];
  const index = favoritesList.findIndex((m) => m.imdbID === movie.imdbID);
  if (index !== -1) {
    favoritesList.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favoritesList));
    displayFavoriteMovies();
  }
}

// Call the function to display favorite movies
displayFavoriteMovies();

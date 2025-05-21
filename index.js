document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Function to handle the search
  const searchGIFs = () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchGIFs(query);
    }
  };

  // Add event listener to the search button
  searchButton.addEventListener("click", searchGIFs);

  // Add event listener to the input field for the "Enter" key
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchGIFs();
    }
  });
});

// Function to fetch GIFs from the Giphy API
const fetchGIFs = (query) => {
  const apiKey = "73jPcmUegaR5liWE3uf1GSASsW4V1z0C"; // Replace with your Giphy API key
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=12`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayGIFs(data.data);
    })
    .catch((error) => {
      console.error("Error fetching GIFs:", error);
    });
};

// Function to display GIFs in the container
const displayGIFs = (gifs) => {
  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = ""; // Clear previous results

  gifs.forEach((gif) => {
    const gifElement = document.createElement("div");
    gifElement.className = "col-md-3";
    gifElement.innerHTML = `
      <div class="card">
        <img src="${gif.images.fixed_height.url}" class="card-img-top" alt="${gif.title}">
      </div>
    `;
    gifContainer.appendChild(gifElement);
  });
};
const $gifArea = $("#gif-area");
const $searchInput = $("#search");
const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"; // Store your API key
const form = $("form")
const removeButton = $("#remove")

/* use ajax result to add a gif */
function addGif(res) {
  let numResults = res.data.length;
  $gifArea.empty(); //clear previous gifs
  if (numResults > 0) { //check if there are results
    for (let i = 0; i < numResults; i++){ //add all the gifs
      let randomIdx = i;
      let $newCol = $("<div>", { class: "col-md-4 col-6 mb-4" }); //make more responsive
      let $newGif = $("<img>", {
        src: res.data[randomIdx].images.original.url,
        class: "w-100 rounded", //add rounded corners
        alt: res.data[randomIdx].title //add alt attribute
      });
      $newCol.append($newGif);
      $gifArea.append($newCol);
    }
  } else {
    $gifArea.text("No gifs found!"); //display message if no gifs are found.
  }
}

/* handle form submission: clear search box & make ajax call */
form.on("submit", async function (evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val().trim(); //remove extra spaces
  $searchInput.val("");

  if (!searchTerm) return; //dont make empty requests

  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", { //changed to https
      params: {
        q: searchTerm,
        api_key: apiKey,
        limit: 20 //add limit
      },
    });
    addGif(response.data);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    $gifArea.text("Failed to load gifs."); //show error message
  }
});

/* remove gif */
removeButton.on("click", function () {
  $gifArea.empty();
});

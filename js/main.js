import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";


import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js";


import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // set the focus 
    setSearchFocus();
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);

}

// Procedural "workflow" function
const submitTheSearch = (event) => {
    event.preventDefault();

    //TODO: delete search results
    deleteSearchResults();


    // process the search
    processTheSearch();


    // set the focus
    setSearchFocus();
};




// procedural
const processTheSearch = async () => {
    //TODO: clear the stats line
    clearStatsLine();

    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;

    const resultArray = await retrieveSearchResults(searchTerm);

    if (resultArray.length) buildSearchResults(resultArray);

    //TODO: set stats line
    setStatsLine(resultArray.length);
};


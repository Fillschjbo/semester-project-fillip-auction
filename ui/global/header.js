import {readProfile} from "../../src/js/api/profile/read.js";
import {API_AUCTION_LISTINGS} from "../../src/js/api/constants.js";
import {setLogoutListener} from "./logut.js";

const plum = document.getElementById("logo");
plum.addEventListener("click", () => {
    location.href = "";
});

const searchButton = document.getElementById("search");
const searchFormContainer = document.getElementById("searchFormContainer");


searchButton.addEventListener("click", () => {
    // Check if the form already exists to prevent duplicates
    if (document.getElementById("searchForm")) return;

    // Create the search form
    const form = document.createElement("form");
    form.id = "searchForm";
    form.classList.add("flex", "space-x-2");
    form.innerHTML = `
                <input 
                  type="text" 
                  id="searchQuery" 
                  name="q" 
                  class="border rounded-md px-4 py-2 flex-1" 
                  placeholder="Search listings..."
                />
                <button 
                  type="submit" 
                  class="bg-secondary text-white px-4 py-2 rounded-md">
                  Go
                </button>
              `;

    searchFormContainer.appendChild(form);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const query = document.getElementById("searchQuery").value.trim();
        if (!query) {
            alert("Please enter a search query.");
            return;
        }

        try {
            const response = await fetch(`${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const results = data.data;
            displaySearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            alert("There was an error performing the search. Please try again later.");
        }
    });
});

function displaySearchResults(results) {

    const resultsContainer = document.getElementById("searchResults");

    if (!resultsContainer) {
        console.error("Search results container not found!");
        return;
    }

    resultsContainer.innerHTML = ""; // Clear any previous results

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("border", "rounded-md", "p-4", "mb-4");

        const mediaUrl = result.media && result.media.length > 0 ? result.media[0].url : "https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg";
        const mediaAlt = result.media?.alt || "Listing Image";

        resultElement.innerHTML = `
      <h2 class="text-lg font-bold">${result.title}</h2>
      <p>${result.description || "No description available."}</p>
      <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" class="w-40 h-20 contain-content"/>
            </div>
    `;
        resultsContainer.appendChild(resultElement);
    });
}


const profile = document.getElementById("profile");
const profileMenu = document.getElementById("profileMenu");
const closeBtn = document.getElementById("closeBtn");

profile.addEventListener("click", () => {
    profileMenu.classList.remove("hidden")
    profileMenu.classList.add("absolute")
});

closeBtn.addEventListener("click", () => {
    profileMenu.classList.remove("absolute");
    profileMenu.classList.add("hidden");
});
export async function getUserData (){
    const user = localStorage.getItem(`user`);
    const data = await readProfile(user);
    const menuBtns = document.getElementById("menuBtns")

    if(!data) {
        const credits = document.getElementById("tokens");
        credits.innerText = 0;

        menuBtns.innerHTML = `
        <ul class="flex flex-col gap-4 pt-16 pl-4 font-Geist font-bold text-base">
            <li class="border-t-2 pt-3"><a href="auth/register/">Register Account</a></li>
             <li class="border-t-2 pt-2"><a href="auth/login/">Login</a></li>
        </ul>
        `
    } else {
        const creditsAPI = data.data.credits;
        const credits = document.getElementById("tokens");
        credits.innerText = creditsAPI;

        menuBtns.innerHTML = `
          <ul class="flex flex-col gap-4 pt-16 pl-4 font-Geist font-bold text-base">
              <li class="border-t-2 pt-3"><a href="profile/">Profile</a></li>
              <li class="border-t-2 pt-2"><button id="logout-btn">Log Out</button></li>
          </ul>
          `
        ;

        const logoutButton = document.getElementById("logout-btn");
        logoutButton.addEventListener("click", setLogoutListener);
    }
}

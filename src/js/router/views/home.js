import {setLogoutListener} from "../../../../ui/global/logut.js";
import {readListings} from "../../api/listing/read.js";
import {getUserData} from "../../../../ui/global/header.js";

const listingsContainer = document.getElementById('listingsContainer');

getUserData ()
async function displayListings(page = 1) {
    const data = await readListings(25, page)
    if (!data) {
        alert("Failed to load posts");
        return;
    }

    const listing = data.data;

    function countdown(endsAt, timerElement) {
        const endDate = new Date(endsAt).getTime();

        let x;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (distance <= 0) {
                clearInterval(x);
                if (timerElement) {
                    timerElement.textContent = "Auction Ended";
                }
            } else if (days > 0) {
                timerElement.textContent = `${days} Day${days > 1 ? "s" : ""} left`;
            } else if (hours > 0) {
                timerElement.textContent = `${hours} Hour${hours > 1 ? "s" : ""} left`;
            } else if (minutes > 0) {
                timerElement.textContent = `${minutes} Minute${minutes > 1 ? "s" : ""} left`;
            } else {
                timerElement.textContent = "Less than a minute left";
            }
        }

        updateCountdown();

        x = setInterval(updateCountdown, 60000);
    }


    listingsContainer.innerHTML = listing.map((listing) => {
        const mediaUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : "https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg";
        const mediaAlt = listing.media?.alt || "Listing Image";
        const tags = listing.tags?.length ? `<p class="tags">${listing.tags.join(", ")}</p>` : "";
        const endsAt = listing.endsAt;

        const timerId = `timer-${listing.id}`;

        return `
        <div class="listing-card" data-id="${listing.id}">
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title">${listing.title}</h2>
            ${tags}
            <p class="body">${listing._count.bids} Credits</p>
            <p class="Timer" id="${timerId}"></p>
        </div>`;
    }).join("");

    const listingCards = document.querySelectorAll(".listing-card");
    listingCards.forEach((card) => {
        const listingId = card.getAttribute("data-id");
        const endsAt = card.querySelector(`#timer-${listingId}`);


        countdown(listing.find((item) => item.id == listingId).endsAt, endsAt);

        card.addEventListener("click", () => {
            localStorage.setItem("listingId", listingId);
            window.location.href = '/listing/'
        });
    });
}

setLogoutListener();
displayListings()
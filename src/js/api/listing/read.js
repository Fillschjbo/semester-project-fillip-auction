import {API_AUCTION_LISTINGS} from "../constants.js";
import {API_KEY} from "../constants.js";
import {getKey} from "../auth/key.js";

function getOptions() {
    return {
        method: "GET",
        headers: {
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
    };
}

export async function readListings(limit = 25, page = 1) {
    const url = new URL(API_AUCTION_LISTINGS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);


    try {
        const response = await fetch(url.toString(), getOptions());
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.data)
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export async function readListing(id) {
    const listingId = localStorage.getItem(`listingId`);
    if(!listingId) {
        alert("No postId found")
        return;
    }

    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}/?_seller=true&_bids=true`, getOptions());

        if (!response.ok) {
            throw new Error(`Failed to fetch listing: ${response.statusText}`);
        }

        const listing = await response.json();
        console.log(listing)
        return listing;

    } catch (error) {
        console.error("Error fetching listing:", error.message);
    }
}

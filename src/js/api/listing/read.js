import {API_AUCTION_LISTINGS} from "../constants.js";
import {API_KEY} from "../constants.js";
import {getKey} from "../auth/key.js";

function getOptions(accessToken) {
    return {
        method: "GET",
        headers: {
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    };
}

export async function readListings(limit = 12, page = 1) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch posts. No access token found.");
        return;
    }

    const url = new URL(API_AUCTION_LISTINGS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);


    try {
        const response = await fetch(url.toString(), getOptions(accessToken));
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

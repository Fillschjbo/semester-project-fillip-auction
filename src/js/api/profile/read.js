import {API_AUCTION_PROFILES, API_KEY} from "../constants.js";
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

export async function readProfile(user){
    const accessToken =  await getKey();
    if (!accessToken){
        console.error("Could not fetch post. No access token found.");
        return;
    }

    try{
        const response = await fetch(`${API_AUCTION_PROFILES}/${user}/?_wins=true&_listings=true`, getOptions(accessToken));
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

    } catch (error) {
        console.error("Error fetching user:", error.message);
    }
};
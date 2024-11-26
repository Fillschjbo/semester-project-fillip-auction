import {readListing} from "../../api/listing/read.js";

async function displayListing() {
    const data = await readListing()
    if (!data) {
        alert("Could not fetch data!")
        return;
    }

};

displayListing()
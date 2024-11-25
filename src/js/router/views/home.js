import {setLogoutListener} from "../../../../ui/global/logut.js";
import {readListings} from "../../api/listing/read.js";
console.log("hello world")

async function displayListings(page = 1){
    const data = readListings(12, page)
    if (!data) {
        alert("Failed to load posts");
        return;
    }
};

setLogoutListener();
displayListings()
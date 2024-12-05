import {readProfile} from "../../api/profile/read.js";

async function displayUserProfile (){
    const user = localStorage.getItem(`user`);
    const data = await readProfile(user);
    if(!data) {
        alert("Could not fetch user data")
        return;
    } else {
        console.log(data)
    }
}

displayUserProfile()
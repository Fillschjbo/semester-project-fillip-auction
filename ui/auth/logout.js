export function onLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", ()=> {
        localStorage.clear();
        window.location.href = "";
    })
}
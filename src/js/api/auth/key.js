export async function getKey() {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        return accessToken;
    } else {
        console.error("Access denied: No access token found.");
        window.location.href = "/auth/login/";
        return null;
    }
}
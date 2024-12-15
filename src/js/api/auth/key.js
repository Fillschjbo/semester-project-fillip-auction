export async function getKey() {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        return accessToken;
    }
}
export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
            await import("./views/home.js");
            break;

        default:
            await import("./views/notFound.js");
    }
}

import { createListing } from "../../src/js/api/listing/create.js";

export async function onCreateListing(event) {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim());
    const mediaUrl = form.mediaUrl.value;
    const endsAt = new Date(form.endsAt.value);

    if (!title || !body || tags.length === 0 || !mediaUrl || isNaN(endsAt.getTime())) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const postData = {
        title: title,
        body: body,
        tags: tags,
        media: [{ url: mediaUrl }],
        endsAt: endsAt.toISOString(),
    };

    try {
        const response = await createListing(postData);

        if (response) {
            window.location.href = "/"
        } else {
            console.error("Failed to create post");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert(`There was an error creating the post: ${error.message}`);
    }
}


const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        // Clear the form
        form.reset();

        // Optional: Show success message
        alert("Your message has been sent successfully!");
    } else {
        alert("There was an error. Please try again.");
    }
});

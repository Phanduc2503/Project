console.log("favorite.js loaded");

// Trang All Breeds
document.querySelectorAll(".favorite-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        const breedId = btn.dataset.id;

        const res = await fetch(`/user/favorites/${breedId}`, {
            method: "POST"
        });

        const data = await res.json();

        if (data.success) {
            btn.innerHTML = "❤️";
        }

    });

});


// Trang Favorites
document.querySelectorAll(".remove-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        const breedId = btn.dataset.id;

        const res = await fetch(`/user/favorites/${breedId}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (data.success) {

            btn.closest(".breed-card").remove();

        }

    });

});

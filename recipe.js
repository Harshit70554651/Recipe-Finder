async function getRecipes(query) {
    const container = document.querySelector(".recipe-container");

    try {
        container.innerHTML = "<p style='color:white;'>Loading...</p>";

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (!data.meals) {
            container.innerHTML = "<p style='color:white;'>Koi recipe nahi mili. Kuch aur try karo.</p>";
            return;
        }

        renderRecipes(data.meals);

    } catch (error) {
        console.error("Kuch galat hua:", error);
        container.innerHTML = "<p style='color:red;'>Recipe load nahi ho payi. Internet check karo.</p>";
    }
}

function renderRecipes(meals) {
    const container = document.querySelector(".recipe-container");
    container.innerHTML = "";

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-detail";
        card.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p class="name">${meal.strMeal}</p>
        <div class="style">
        <p class="country">${meal.strArea}</p>
        </div>`;
        container.appendChild(card);
    });
}

const searchInput = document.querySelector(".input input");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query === "") {
        alert("Kuchh to likho search karne ke liye");
        return;
    }
    getRecipes(query);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
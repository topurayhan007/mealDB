const loadMeals = async (searchText, index) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  // console.log("asdsa", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals, index);
  } catch (error) {
    alert("No food found");

    console.log(error);
  }
};

const displayMeals = (meals, index) => {
  const mealsContainer = document.getElementById("meals-container");
  const showAllButton = document.getElementById("btn-show-all");
  mealsContainer.innerHTML = "";
  if (index < meals.length) {
    meals = meals.slice(0, index);
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");

    mealDiv.innerHTML = `
    <div
            class="flex md:flex-col lg:flex-row items-center bg-white border border-2 border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <img
              src="${meal.strMealThumb}"
              class="object-cover w-1/2 md:w-full rounded-t-lg rounded-b-lg h-56 lg:h-72"
              alt=""
            />
            <div
              class="flex flex-col justify-between gap-2 pl-4 md:p-4 leading-normal text-left"
            >
              <h4 class="text-md md:text-2xl text-[#403F3F] font-bold">
              ${meal.strMeal}
              </h4>
              <p
                class="text-[#706F6F] text-sm md:text-lg font-normal md:mt-4 md:mb-6"
              >
                There are many variations of passages of available, but the
                majority have suffered.
              </p>
              <h5
                onclick="loadMealDetail2(${meal.idMeal})"
                class="text-[#FFC107] font-semibold underline md:mb-2 lg:mb-0"
              >
                View Details
              </h5>
            </div>
          </div>
    `;

    mealsContainer.appendChild(mealDiv);
  });
};

const returnSearchText = () => {
  const searchText = document.getElementById("search-field").value;
  return searchText;
};

const searchMeals = () => {
  const searchText = returnSearchText();
  loadMeals(searchText, 6);
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  loadMeals(returnSearchText());
});

loadMeals("", 6);

// NAVBAR

document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".toggler");
  const nav = document.querySelector("nav");

  toggler.addEventListener("click", function () {
    nav.style.display = nav.style.display === "none" ? "block" : "none";
  });
});

// LOAD MORE BUTTON

// Select the elements from the DOM that we will be interacting with
const methodsContainer = document.querySelector(".methods");
const loadMoreButton = document.querySelector(".load-more-button");

// Initialize empty arrays and variables to store data
let methods = [];
let methodsToShow = 12;
let isShowingAllMethods = false;

// This function generates the HTML for the methods and updates the DOM
function showMethods() {
  // Clear the existing methods from the DOM
  methodsContainer.innerHTML = "";

  // Loop through the first `methodsToShow` number of methods in the `methods` array
  // and generate HTML for each method
  methods.slice(0, methodsToShow).forEach((method) => {
    const methodHTML = `
      <div class="method">
        ${
          method.template && method.template.url
            ? `<img src="${method.template.url}" alt="Voorbeeld van ${method.title}">`
            : `<img src="/assets/placeholder.jpg" alt="Placeholder Image">`
        }
        <h2>${method.title}</h2>
      </div>
    `;
    // Add the generated HTML to the `methodsContainer` element
    methodsContainer.insertAdjacentHTML("beforeend", methodHTML);
  });

  // Update the text of the `loadMoreButton` depending on whether all methods are shown
  if (methodsToShow >= methods.length) {
    loadMoreButton.textContent = "Laad Minder";
    isShowingAllMethods = true;
  } else {
    loadMoreButton.textContent = "Laad Meer";
    isShowingAllMethods = false;
  }
}

// This function fetches the methods data from an API and updates the `methods` array
function getMethods() {
  fetch("https://api.visualthinking.fdnd.nl/api/v1/methods?first=100")
    .then((response) => response.json())
    .then((data) => {
      methods = data.methods;
      // Once the `methods` array is updated, call the `showMethods` function to display them
      showMethods();
    })
    .catch((error) => {
      console.error("Error fetching methods:", error);
    });
}

// Call the `getMethods` function to start fetching and displaying the methods
getMethods();

// Add a click event listener to the `loadMoreButton` element
loadMoreButton.addEventListener("click", function () {
  if (isShowingAllMethods) {
    // If all methods are already shown, update `methodsToShow` to only show the first 12 methods
    methodsToShow = 12;
    loadMoreButton.textContent = "Laad Meer";
    isShowingAllMethods = false;
  } else {
    // If not all methods are shown, update `methodsToShow` to show all available methods
    methodsToShow = methods.length;
    loadMoreButton.textContent = "Laad Minder";
    isShowingAllMethods = true;
  }
  // Once the `methodsToShow` value is updated, call the `showMethods` function to display the methods
  showMethods();
});

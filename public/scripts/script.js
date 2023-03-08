document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".toggler");
  const nav = document.querySelector("nav");

  toggler.addEventListener("click", function () {
    nav.style.display = nav.style.display === "none" ? "block" : "none";
  });
});

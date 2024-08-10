document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is the login page
  if (window.location.pathname === "/login") {
    // Hide the footer
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "none";
    }
  }
});









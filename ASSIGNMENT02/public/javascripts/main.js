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

document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is the login page
  if (window.location.pathname === "/register") {
    // Hide the footer
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "none";
    }
  }
});

app.get("/login", (req, res) => {
  // Check if the user is authenticated
  if (req.session && req.session.user) {
    // Pass the username to the template
    res.render("/home", {
      username: req.session.user.username, // assuming `username` is stored in `req.session.user`
    });
  } else {
    // If not authenticated, redirect to login or show an error
    res.redirect("/login"); // or you can render an error page
  }
});

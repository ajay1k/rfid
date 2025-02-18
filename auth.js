document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "ajay" && password === "12341234") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        document.getElementById("errorMessage").innerText = "Invalid username or password!";
    }
});

// Check if user is authenticated
function checkAuth() {
    if (localStorage.getItem("isAuthenticated") !== "true") {
        window.location.href = "index.html"; // Redirect to login page
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "index.html";
}

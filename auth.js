document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "ajay" && password === "0308@2004") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        document.getElementById("errorMessage").innerText = "Invalid username or password!";
    }
});

// Check if user is authenticated
function checkAuth() {
    if (localStorage.getItem("isAuthenticated") !== "true") {
        window.location.href = "login.html"; // Redirect to login page
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "login.html";
}

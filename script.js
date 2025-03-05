const API_URL = "https://script.google.com/macros/s/AKfycbzGZc5mG2xlgf-X6vBELzoBk7EBdb2Ad4ge5ArMwWs9q5cjrL-ShCJgPbj0JLe_gPJ31g/exec"; // Replace with your Web App URL

// Function to Fetch & Display Data
async function fetchUserData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        let tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = ""; // Clear old data

        data.forEach((user, index) => {
            let row = `<tr>
                <td>${user.name}</td>
                <td>${user.uid}</td>
                <td><button onclick="updateUser('${user.uid}', '${user.name}')">Update</button></td>
                <td><button onclick="deleteUser('${user.uid}')">Delete</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to Add New User
async function addUser() {
    let name = document.getElementById("newName").value;
    let uid = document.getElementById("newUID").value;

    let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "addUser", name: name, uid: uid }),
    });

    let result = await response.text();
    alert(result);
    fetchUserData();
}

// Function to Update User
async function updateUser(uid, oldName) {
    let newName = prompt("Enter new name for UID " + uid, oldName);
    if (!newName) return;

    let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "updateUser", uid: uid, name: newName }),
    });

    let result = await response.text();
    alert(result);
    fetchUserData();
}

// Function to Delete User
async function deleteUser(uid) {
    if (!confirm("Are you sure you want to delete UID " + uid + "?")) return;

    let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "deleteUser", uid: uid }),
    });

    let result = await response.text();
    alert(result);
    fetchUserData();
}

// Function to Mark Attendance
async function markAttendance() {
    let uid = prompt("Enter UID for attendance:");
    if (!uid) return;

    let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "addAttendance", uid: uid }),
    });

    let result = await response.text();
    alert(result);
}

// Load Data When Page Opens
document.addEventListener("DOMContentLoaded", fetchUserData);

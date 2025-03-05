const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxIV22jRtFbux6EbAPtvOGPtNhNbHCNMNr4OYNGafRHCN3JzlwwpQYeadj9Mt2LYSU0Lg/exec"; // Replace with your actual Web App URL

// Function to fetch and display data
async function fetchEntries() {
    let response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "get" })
    });

    let data = await response.json();
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";  // Clear existing rows

    data.forEach((row, index) => {
        if (index > 0) { // Skip headers
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td><input type="text" id="newName-${row[1]}" placeholder="Enter new name"></td>
                <td><button onclick="updateName('${row[1]}')">Update</button></td>
                <td><button onclick="deleteEntry('${row[1]}')">Delete</button></td>
            `;
            tableBody.appendChild(tr);
        }
    });
}

// Function to update a name
async function updateName(uid) {
    let newName = document.getElementById(`newName-${uid}`).value;
    if (!newName) return alert("Please enter a new name!");

    let response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "update", uid: uid, newName: newName })
    });

    let result = await response.text();
    alert(result);
    fetchEntries();  // Refresh data
}

// Function to delete an entry
async function deleteEntry(uid) {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    let response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "delete", uid: uid })
    });

    let result = await response.text();
    alert(result);
    fetchEntries();  // Refresh data
}

function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "login.html";
}

function attendance() {
    window.location.href = "index.html";
}

// Auto-refresh every 0.5 minute
setInterval(fetchEntries, 30000);

// Load data on page load
fetchEntries();

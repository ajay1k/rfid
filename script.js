const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxXrXRuJuAjj6lf7LQqSkkg5MGOZV7nWFiQNcjnPNymESUdWaya6t8JLlYOLMfQ9YTIuA/exec"; // Replace with your Web App URL

async function fetchEntries() {
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get" })
        });

        let result = await response.json();
        console.log("Data received:", result);
        if (result.status === "success") {
            updateTable(result.data);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching data. Make sure your Web App is deployed correctly.");
    }
}

// Function to update table
function updateTable(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";  // Clear existing rows

    data.forEach(row => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.uid}</td>
            <td><input type="text" id="newName-${row.uid}" placeholder="Enter new name"></td>
            <td><button onclick="updateName('${row.uid}')">Update</button></td>
            <td><button onclick="deleteEntry('${row.uid}')" style="background:red;">Delete</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Function to update a name
async function updateName(uid) {
    let newName = document.getElementById(`newName-${uid}`).value;
    if (!newName) return alert("Please enter a new name!");

    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Add headers
            body: JSON.stringify({ action: "update", uid: uid, newName: newName })
        });

        let result = await response.json();
        alert(result.message);
        fetchEntries(); // Refresh data
    } catch (error) {
        console.error("Update error:", error);
        alert("Error updating data.");
    }
}

// Function to delete an entry
async function deleteEntry(uid) {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Add headers
            body: JSON.stringify({ action: "delete", uid: uid })
        });

        let result = await response.json();
        alert(result.message);
        fetchEntries(); // Refresh data
    } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting entry.");
    }
}

// Auto-refresh every 30 seconds
setInterval(fetchEntries, 30000);

// Load data on page load
fetchEntries();

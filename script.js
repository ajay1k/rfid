const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwq89Jz8x3JNSeM_zIlSI0Tm34yItgwp58G4svTWQ55z56ppS4P3wCoL8XV0G0aXlFm6w/exec"; // Replace with your Web App URL

// Function to fetch and display data
async function fetchEntries() {
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get" })
        });

        let result = await response.json();
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = "";

        if (result.status === "success") {
            result.data.forEach(row => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.name}</td>
                    <td>${row.uid}</td>
                    <td><input type="text" id="newName-${row.uid}" placeholder="Enter new name"></td>
                    <td><button onclick="updateName('${row.uid}')">Update</button></td>
                    <td><button onclick="deleteEntry('${row.uid}')">Delete</button></td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            alert("Error fetching data: " + result.message);
        }
    } catch (error) {
        alert("Fetch error: " + error.message);
    }
}

// Function to update a name
async function updateName(uid) {
    let newName = document.getElementById(`newName-${uid}`).value;
    if (!newName) return alert("Please enter a new name!");

    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "update", uid, newName })
        });

        let result = await response.json();
        alert(result.message);
        fetchEntries();
    } catch (error) {
        alert("Update error: " + error.message);
    }
}

// Function to delete an entry
async function deleteEntry(uid) {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", uid })
        });

        let result = await response.json();
        alert(result.message);
        fetchEntries();
    } catch (error) {
        alert("Delete error: " + error.message);
    }
}

// Auto-refresh every 30 seconds
setInterval(fetchEntries, 30000);

// Load data on page load
document.addEventListener("DOMContentLoaded", fetchEntries);

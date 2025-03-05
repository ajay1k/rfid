const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby_AO78WXfa2CPmTheknQFdnkeJ-IanWN-sPLwc2Mm5Cy-tWiX_7ZOAHmv9KlnZ6Aa72A/exec"; // Replace with actual Web App URL

async function fetchEntries() {
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get" })
        });

        let result = await response.json();
        console.log("Fetched Data:", result);

        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = "";

        if (result.status === "success" && result.data.length > 0) {
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
            tableBody.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function updateName(uid) {
    let newName = document.getElementById(`newName-${uid}`).value;
    if (!newName) return alert("Please enter a new name!");

    await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", uid: uid, newName: newName })
    });

    fetchEntries();
}

async function deleteEntry(uid) {
    if (!confirm("Are you sure?")) return;

    await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", uid: uid })
    });

    fetchEntries();
}

document.addEventListener("DOMContentLoaded", fetchEntries);

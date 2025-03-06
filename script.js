document.addEventListener("DOMContentLoaded", function() {
    fetchUserData();
});

function fetchUserData() {
    fetch("https://script.google.com/macros/s/AKfycbwgpEy1oEt9pqZWN86oBIVkTS8v2TJe8yrgqPWS06VY4PJfLRaX75KmHWDrj-OrTXhn_g/exec")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("userTable");
            tableBody.innerHTML = ""; // Clear table
            data.forEach(user => {
                let row = `<tr>
                    <td>${user.name}</td>
                    <td>${user.uid}</td>
                    <td><input type="text" id="newName-${user.uid}" placeholder="Enter new name"></td>
                    <td><button onclick="updateName('${user.uid}')">Update</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function updateName(uid) {
    const newName = document.getElementById(`newName-${uid}`).value;
    if (!newName) {
        alert("Please enter a new name.");
        return;
    }
    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", uid: uid, newName: newName })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUserData(); // Refresh the table
    })
    .catch(error => console.error("Error updating name:", error));
}


// Load Data When Page Opens
document.addEventListener("DOMContentLoaded", fetchUserData);

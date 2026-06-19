// Saving task localy
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Saves the current settings on the browser.
function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

// adjusting Settings 
document.getElementById("unit").addEventListener("change", function () {
    settings.unit = this.value;
    saveSettings();
    renderTasks();
    renderDashboard();
});

// setting weekly target in number
document.getElementById("weeklyTarget").addEventListener("input", function () {
    settings.weeklyTarget = Number(this.value);
    saveSettings();
    renderDashboard();
    showMessage("Weekly goal updated successfully.");
});

// change mode to Light or Dark theme
document.querySelectorAll('input[name="theme"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        settings.theme = this.value;
        saveSettings();

        if (this.value === "Dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    });
});


// turning our tasks into a downloadable json file
document.getElementById("export-btn").addEventListener("click", function () {
    // well formatted JSON string
    const jsonText = JSON.stringify(tasks, null, 2);

    // Creating a file from that text
    const blob = new Blob([jsonText], { type: "application/json" });

    // Creating a temporary download link that is clickable
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();

    // Clean up the temporary link
    URL.revokeObjectURL(url);
});

// Returning settings back into the form when the page first loads

document.getElementById("unit").value = settings.unit;
document.getElementById("weeklyTarget").value = settings.weeklyTarget;

if (settings.theme === "Dark") {
    document.body.classList.add("dark");
    document.getElementById("darkTheme").checked = true;
} else {
    document.getElementById("lightTheme").checked = true;
}

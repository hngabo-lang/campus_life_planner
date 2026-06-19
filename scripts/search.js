// Regex Search
function compileSafeRegex(rawText, caseSensitive) {
    if (!rawText) return null;

    try {
        return new RegExp(rawText, caseSensitive ? "" : "i");
    } catch (err) {
        showMessage("Task not available");
        return null;
    }
}

// Runs every time the search box changes.
function runSearch() {
    // when case sensitive checkbox switvhed
    const caseSensitive = document.getElementById("case-toggle").checked;

    // typed data
    const rawText = document.getElementById("search-box").value;

    const re = compileSafeRegex(rawText, caseSensitive);

    // stop when data not in rejex + message
    if (rawText && !re) return;

    const results = tasks.filter(function (task) {
        return re ? re.test(task.title) || re.test(task.tag) : true;
    });

    renderTasks(results, re);
}

// Run the search again every time the user types
document.getElementById("search-box").addEventListener("input", runSearch);

// running again the search when they toggle 
document.getElementById("case-toggle").addEventListener("change", runSearch);

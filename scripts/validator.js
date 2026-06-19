// Forms & Regex Validation
// This file holds every regex rule we use to check the task form

// no space at the start or the end of the title.
const titleRegex = /^(?=.{3,20}$)[A-Za-z]+(?: [A-Za-z]+)*$/;

// Duration 
const durationRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

// Date (YYYY-MM-DD)
// Checks if the year match the pattern.
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// Tag/category
const tagRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// repeated word
const repeatedWordRegex = /\b(\w+)\s+\1\b/i;

// Error message helpers, Shows a message on the screen for 3 seconds, then clears it.
function showMessage(text) {
    const messageBox = document.getElementById("message");
    messageBox.textContent = text;

    setTimeout(function () {
        messageBox.textContent = "";
    }, 3000);
}

// Clears the message box right away, no waiting.
function clearMessage() {
    document.getElementById("message").textContent = "";
}

// The main check
function validateTaskFields(fields) {
    const title = fields.title;
    const dueDate = fields.dueDate;
    const duration = fields.duration;
    const tag = fields.tag;

    if (!titleRegex.test(title)) {
        return { valid: false, error: "Title can't start or end with a space and must be letters only." };
    }

    if (!tagRegex.test(tag)) {
        return { valid: false, error: "Tag must be letters only (spaces or hyphens allowed between words)." };
    }

    if (!dateRegex.test(dueDate)) {
        return { valid: false, error: "Date format is invalid." };
    }

    // checkin if date is still valid not past
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return { valid: false, error: "Past dates are not allowed." };
    }

    if (!durationRegex.test(String(duration))) {
        return { valid: false, error: "Duration must be a positive number." };
    }

    if (repeatedWordRegex.test(title)) {
        return { valid: false, error: "Repeated words are not allowed." };
    }

    // all passed successfukly
    return { valid: true, error: null };
}

// Ready to submit
document.getElementById("forms").addEventListener("submit", function (e) {
    
    // Stop the page from refreshing 
    e.preventDefault();

    // Reading input data
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const duration = Number(document.getElementById("duration").value);
    const tag = document.getElementById("tag").value;

    clearMessage();

    // Run all the checks
    const result = validateTaskFields({ title: title, dueDate: dueDate, duration: duration, tag: tag });

    if (!result.valid) {
        showMessage(result.error);
        return;
    }

    if (editingId) {
        // updating an existing task
        const task = tasks.find(function (t) {
            return t.id === editingId;
        });

        task.title = title;
        task.dueDate = dueDate;
        task.duration = duration;
        task.tag = tag;
        task.updatedAt = new Date().toISOString();

        showMessage("Task updated successfully.");
        editingId = null;
        document.getElementById("submitBtn").textContent = "Add Task";
    } else {
        // adding a new task
        tasks.push({
            id: generateNextId(), // makes ids like "tsk_001", "tsk_002"...
            title: title,
            dueDate: dueDate,
            duration: duration,
            tag: tag,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        showMessage("Task added successfully.");
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    this.reset();
});

// Clear any old message when the page first loads
clearMessage();

// refusing past date
document.getElementById("dueDate").min = new Date().toISOString().split("T")[0];


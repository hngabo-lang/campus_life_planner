// creating the task table using "re" for regex
// Also <mark> tags make the text to match the search pattern.
function renderTasks(list = tasks, re = null) {
    const tableBody = document.getElementById("task-list");

    // Making table empty
    tableBody.innerHTML = "";

    // when empty show
    if (list.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No tasks found, add task</td></tr>";
        return;
    }

    list.forEach(function (task) {
        // Display duration either in minutes or hours as set in settings
        let durationText;
        if (settings.unit === "hours") {
            durationText = (task.duration / 60).toFixed(1) + " h";
        } else {
            durationText = task.duration + " min";
        }

        // highlighting matching text
        const highlightedTitle = re
            ? task.title.replace(re, function (m) {
                  return "<mark>" + m + "</mark>";
              })
            : task.title;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${highlightedTitle}</td>
            <td>${task.dueDate}</td>
            <td>${durationText}</td>
            <td>${task.tag}</td>
            <td>
                <button class="update-btn" onclick="editTask('${task.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// update and Delete

// Showing current data inside the form to change it.
function editTask(id) {
    const task = tasks.find(function (t) {
      return String(t.id) === String(id);
    });

    if (!task) return; // when task is not found, do nothing

    document.getElementById("title").value = task.title;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("duration").value = task.duration;
    document.getElementById("tag").value = task.tag;

    editingId = id;
    document.getElementById("submitBtn").textContent = "Update Task";

    // Scroll up so the user can see the form
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

// Deleting choosen task after asking the user to confirm.
function deleteTask(id) {
    if (!confirm("Delete this task?")) {
        return;
    }

    tasks = tasks.filter(function (task) {
        return String(task.id) !== String(id);
    });

    saveTasks();
    renderTasks();
    renderDashboard();
    showMessage("Task deleted successfully.");
}

// Sorting tasks

document.getElementById("sort").addEventListener("change", function () {
    let sorted = [...tasks];

    if (this.value === "title") {
        // sorting AZ by title
        sorted.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
    } else if (this.value === "duration") {
        // sort by size 
        sorted.sort(function (a, b) {
            return a.duration - b.duration;
        });
    } else {
        // sort by time
        sorted.sort(function (a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    renderTasks(sorted);
});

// Dashboard cards + Cap/Target + ARIA live messages

function renderDashboard() {
    // total tasks
    document.getElementById("total-tasks").textContent = tasks.length;

    // Adding task's duration
    let totalDuration = 0;
    tasks.forEach(function (task) {
        totalDuration += task.duration;
    });

    if (settings.unit === "hours") {
        document.getElementById("total-duration").textContent =
            (totalDuration / 60).toFixed(1) + " h";
    } else {
        document.getElementById("total-duration").textContent =
            totalDuration + " min";
    }

    // Most showing up tag
    const tagCount = {};
    tasks.forEach(function (task) {
        tagCount[task.tag] = (tagCount[task.tag] || 0) + 1;
    });

    let topTag = "None";
    if (Object.keys(tagCount).length > 0) {
        topTag = Object.keys(tagCount).reduce(function (a, b) {
            return tagCount[a] > tagCount[b] ? a : b;
        });
    }
    document.getElementById("top-tag").textContent = topTag;

    // tasks due in the next 7 days
    const today = new Date();
    const dueSoonList = tasks.filter(function (task) {
        const dueDate = new Date(task.dueDate);
        const daysLeft = (dueDate - today) / (1000 * 60 * 60 * 24);
        return daysLeft >= 0 && daysLeft <= 7;
    });
    document.getElementById("due-soon").textContent = dueSoonList.length;

    // Weekly target card + cap check
    const targetCard = document.getElementById("weekly-target-card");
    let isOverTarget = false;

    if (settings.weeklyTarget > 0) {
        targetCard.textContent = settings.weeklyTarget + " min";
        isOverTarget = totalDuration > settings.weeklyTarget;
    } else {
        targetCard.textContent = "Not Set";
    }

    // Changing the weekly target color when shorter
    targetCard.classList.toggle("over-cap", isOverTarget);

    // Tell screen reader users what just happened
    announceDashboardUpdate(totalDuration, settings.weeklyTarget, isOverTarget);
}

// short message in aria-live 

function announceDashboardUpdate(totalDuration, weeklyTarget, isOverTarget) {
    const liveBox = document.getElementById("dashboard-status");
    if (!liveBox) return; // incase this is not found, skip it

    let message = "Total tasks: " + tasks.length + ". Total time: " + totalDuration + " minutes.";

    if (weeklyTarget > 0) {
        if (isOverTarget) {
            message += " Warning: you went over your weekly target of " + weeklyTarget + " minutes.";
        } else {
            const remaining = weeklyTarget - totalDuration;
            message += " You have " + remaining + " minutes left before reaching your target.";
        }
    }

    liveBox.textContent = message;
}


// displaying on page all things

renderTasks();
renderDashboard();

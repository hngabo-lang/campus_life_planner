
// This file just holds the data that every other file needs to use.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// null used when "we are not editing, but we are adding a new task."
let editingId = null;

// Settings where the user can change (time unit, weekly target, theme).
let settings = JSON.parse(localStorage.getItem("settings")) || {
    unit: "minutes",
    weeklyTarget: 0,
    theme: "Light"
};

// Making ids like "tsk_001"

function generateNextId() {
    let highestNumberSoFar = 0;

    tasks.forEach(function (task) {
        // Only look at ids that follow "tsk_001" pattern
        if (typeof task.id === "string" && task.id.indexOf("tsk") === 0) {
            const numberPart = Number(task.id.slice(3));
            if (!isNaN(numberPart) && numberPart > highestNumberSoFar) {
                highestNumberSoFar = numberPart;
            }
        }
    });

    const nextNumber = highestNumberSoFar + 1;

    // turns task input like 1 into "001" and 10 into "010"
    return "tsk_" + String(nextNumber).padStart(3, "0");
}


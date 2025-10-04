document.addEventListener("DOMContentLoaded", () => {
  const reminderInput = document.getElementById("reminderInput");
  const reminderDateTime = document.getElementById("reminderDateTime");
  const addBtn = document.getElementById("addBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const reminderList = document.getElementById("reminderList");

  // Add reminder
  addBtn.addEventListener("click", () => {
    const text = reminderInput.value.trim();
    const dateTime = reminderDateTime.value;

    if (text === "" || dateTime === "") {
      alert("Please enter reminder text and select a date/time.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = `${text} - ${new Date(dateTime).toLocaleString()}`;

    // Delete button for each reminder
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => {
      reminderList.removeChild(li);
    });

    li.appendChild(delBtn);
    reminderList.appendChild(li);

    reminderInput.value = "";
    reminderDateTime.value = "";
  });

  // Clear all reminders
  clearAllBtn.addEventListener("click", () => {
    reminderList.innerHTML = "";
  });
});

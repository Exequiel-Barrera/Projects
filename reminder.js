// Get HTML elements
const addBtn = document.getElementById("addBtn");
const reminderInput = document.getElementById("reminderInput");
const reminderList = document.getElementById("reminderList");

// Add reminder
addBtn.addEventListener("click", () => {
  const text = reminderInput.value.trim();

  if (text === "") {
    alert("Please enter a reminder!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = text;

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Done";
  li.appendChild(deleteBtn);

  // Delete reminder on click
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Add to list
  reminderList.appendChild(li);

  // Clear input
  reminderInput.value = "";
});

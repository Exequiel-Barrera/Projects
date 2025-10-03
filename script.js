const form = document.getElementById("form");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = [];

// Add Transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;

  const transaction = { text, amount };
  transactions.push(transaction);

  updateUI();
  form.reset();
});

function updateUI() {
  list.innerHTML = "";
  let total = 0, inc = 0, exp = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.text} <span>${t.amount < 0 ? "-" : "+"}$${Math.abs(t.amount)}</span>`;
    list.appendChild(li);

    total += t.amount;
    if (t.amount > 0) inc += t.amount;
    else exp += Math.abs(t.amount);
  });

  balance.textContent = `$${total.toFixed(2)}`;
  income.textContent = `+$${inc.toFixed(2)}`;
  expense.textContent = `-$${exp.toFixed(2)}`;
}

// 📧 Send Report
const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  // Build the report text
  let report = "Expense Report:\n\n";
  transactions.forEach(t => {
    report += `${t.text}: ${t.amount < 0 ? "-" : "+"}$${Math.abs(t.amount)}\n`;
  });
  report += `\nBalance: ${balance.textContent}\nIncome: ${income.textContent}\nExpense: ${expense.textContent}`;

  // Send email via EmailJS
  emailjs.send("M6YzYPwiZn0UelRf9", "expense report", {
    to_email: email,
    report_text: report
  }).then(() => {
    alert("Report sent successfully!");
  }).catch((err) => {
    console.error("Failed to send email:", err);
    alert("Error sending report.");
  });

  emailForm.reset();
});

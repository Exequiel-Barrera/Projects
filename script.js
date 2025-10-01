const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const inc = amounts.filter(i => i > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const exp = (amounts.filter(i => i < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `+$${inc}`;
  expense.innerText = `-$${exp}`;
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Math.floor(Math.random() * 100000),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  addTransactionDOM(transaction);
  updateValues();

  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';
  const li = document.createElement('li');
  li.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

  li.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(li);
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  init();
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener('submit', addTransaction);

// 🔑 Simple hardcoded password (for demo only!)
const PASSWORD = "admin123";

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');
const dataInput = document.getElementById('data-input');
const dataList = document.getElementById('data-list');

// Load data from localStorage on app screen load
function loadStoredData() {
  const data = JSON.parse(localStorage.getItem('userData')) || [];
  renderData(data);
}

// Render list of data items
function renderData(data) {
  dataList.innerHTML = '';
  data.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => removeData(index);
    li.appendChild(delBtn);
    dataList.appendChild(li);
  });
}

// Login function
function login() {
  const pwd = passwordInput.value.trim();
  if (pwd === PASSWORD) {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    loadStoredData();
    passwordInput.value = '';
    loginError.textContent = '';
  } else {
    loginError.textContent = '❌ Invalid password';
  }
}

// Logout
function logout() {
  appScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}

// Add data
function addData() {
  const text = dataInput.value.trim();
  if (!text) return alert('Please enter some data.');
  
  const data = JSON.parse(localStorage.getItem('userData')) || [];
  data.push(text);
  localStorage.setItem('userData', JSON.stringify(data));
  renderData(data);
  dataInput.value = '';
  dataInput.focus();
}

// Remove data by index
function removeData(index) {
  const data = JSON.parse(localStorage.getItem('userData')) || [];
  data.splice(index, 1);
  localStorage.setItem('userData', JSON.stringify(data));
  renderData(data);
}

// Optional: Allow Enter key in login & add fields
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') login();
});

dataInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addData();
});
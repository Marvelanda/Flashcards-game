const loginForm = document.getElementById('login_form');
const showLogin = document.querySelector('[data-name="login"]');
const registerForm = document.getElementById('register_form');
const showRegister = document.querySelector('[data-name="registration"]');
const messageForUser = document.querySelector('[data-name="messageForUser"]');

showLogin.addEventListener('click', (evt) => {
  evt.preventDefault();
  messageForUser.classList.add('hidden');
  registerForm.classList.add('hidden');
  loginForm.classList.toggle('hidden');
});

showRegister.addEventListener('click', (evt) => {
  evt.preventDefault();
  messageForUser.classList.add('hidden');
  loginForm.classList.add('hidden');
  registerForm.classList.toggle('hidden');
});

// registerForm.addEventListener('submit', async (evt) => {
//   evt.preventDefault();
//   const formData = new FormData(registerForm);
//   const parseData = Object.fromEntries(formData);
//   console.log(parseData);

//   const response = await fetch('/register', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(parseData),
//   });

//   const data = await response.json();

//   if (data.error) {
//     messageForUser.innerHTML = data.error;
//     messageForUser.classList.toggle('hidden');
//   } else {
//     messageForUser.innerHTML = data.message;
//     messageForUser.classList.toggle('hidden');
//   }
// });

// loginForm.addEventListener('submit', async (evt) => {
//   evt.preventDefault();
//   const formData = new FormData(loginForm);
//   const parseData = Object.fromEntries(formData);

//   const response = await fetch('/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(parseData),
//   });

//   const data = await response.json();

//   if (data.error) {
//     messageForUser.innerHTML = data.error;
//     messageForUser.classList.toggle('hidden');
//   } else {
//     messageForUser.innerHTML = data.message;
//     messageForUser.classList.toggle('hidden');
//   }
// });

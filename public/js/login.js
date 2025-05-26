async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    sessionStorage.setItem('file', data.file);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('message').textContent = data.message;
  }
}

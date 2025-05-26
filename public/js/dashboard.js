const file = sessionStorage.getItem('file');

async function loadLinks() {
  const res = await fetch('/api/userData/' + file);
  const data = await res.json();
  const list = document.getElementById('linkList');
  list.innerHTML = '';
  data.links.forEach((link, i) => {
    const li = document.createElement('li');
    li.textContent = `${link.title} - ${link.url}`;
    // Optioneel: knopje om te verwijderen
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Verwijder';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => {
      data.links.splice(i, 1);
      saveLinks(data);
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function saveLinks(data) {
  await fetch('/api/userData/' + file, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  loadLinks();
}

async function addLink() {
  const title = document.getElementById('newTitle').value;
  const url = document.getElementById('newUrl').value;
  if (!title || !url) return alert('Vul beide velden in!');
  const res = await fetch('/api/userData/' + file);
  const data = await res.json();
  data.links.push({ title, url });
  await saveLinks(data);
  document.getElementById('newTitle').value = '';
  document.getElementById('newUrl').value = '';
}

loadLinks();

let scanMode = 'entry';

const updateTable = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.scan.entry ? '✅' : '❌'}</td>
      <td>${user.scan.food ? '✅' : '❌'}</td>
      <td>${user.scan.gift ? '✅' : '❌'}</td>
    `;
    tbody.appendChild(tr);
  });
};

updateTable();

document.querySelectorAll('.scan-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    scanMode = btn.getAttribute('data-type');
    document.getElementById('currentMode').textContent = scanMode.charAt(0).toUpperCase() + scanMode.slice(1);
  });
});

// ✅ SCANNER CODE
function onScanSuccess(decodedText, decodedResult) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const index = users.findIndex(u => u.id === decodedText);

  if (index === -1) {
    Swal.fire('Not Found', 'QR code not matched.', 'error');
    return;
  }

  users[index].scan[scanMode] = true;
  localStorage.setItem('users', JSON.stringify(users));
  Swal.fire('Success', `${scanMode} marked for ${users[index].name}`, 'success');
  updateTable();
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader", { fps: 10, qrbox: 250 }
);
html5QrcodeScanner.render(onScanSuccess);

function onScanSuccess(decodedText, decodedResult) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const index = users.findIndex(u => u.id === decodedText);

  if (index === -1) {
    Swal.fire('Not Found', 'QR code not matched with any user.', 'error');
    return;
  }

  const user = users[index];

  // ✅ Check if already scanned for the current mode
  if (user.scan[scanMode]) {
    Swal.fire({
      icon: 'info',
      title: 'Already Scanned',
      text: `${scanMode.charAt(0).toUpperCase() + scanMode.slice(1)} already marked for ${user.name}.`,
    });
    return;
  }

  // ✅ Mark scan for current mode
  user.scan[scanMode] = true;
  localStorage.setItem('users', JSON.stringify(users));

  // ✅ Show success message only once
  Swal.fire({
    icon: 'success',
    title: 'Scan Successful',
    text: `${scanMode.charAt(0).toUpperCase() + scanMode.slice(1)} marked for ${user.name}`,
  });

  updateTable();
}
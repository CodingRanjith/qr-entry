document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
  
    if (!name || !email || !phone) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      return;
    }
  
    const id = Date.now().toString();
    const user = {
      id,
      name,
      email,
      phone,
      scan: { entry: false, food: false, gift: false }
    };
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {
      text: id,
      width: 200,
      height: 200,
    });
  
    Swal.fire('Success', 'Registered successfully & QR code generated.', 'success');
    e.target.reset();
  });
  
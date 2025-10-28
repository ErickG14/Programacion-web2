function generarQR() {
  const input1 = document.getElementById('input1').value.trim();
  const input2 = document.getElementById('input2').value.trim();
  const input3 = document.getElementById('input3').value.trim();
  const input4 = document.getElementById('input4').value.trim();

  const textoCompleto = `${input1} ${input2} ${input3} ${input4}`;

  if (textoCompleto === "") {
    alert("Ingresa al menos un texto para generar el QR");
    return;
  }

  const qrCodeURL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(textoCompleto);

  const contenedorQR = document.getElementById('qr-code');
  contenedorQR.innerHTML = ""; // 🔥 Limpia el QR anterior

  const qrimg = document.createElement('img');
  qrimg.src = qrCodeURL;
  qrimg.alt = 'Código QR generado';
  qrimg.classList.add('qr-code');

  contenedorQR.appendChild(qrimg);
}



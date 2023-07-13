let socios = [];

const afiliacionForm = document.getElementById('afiliacionForm');
afiliacionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const categoria = document.getElementById('categoria').value;

  const socio = {
    id: socios.length + 1,
    nombre,
    categoria,
    cuotaPagada: false,
    accesoPermitido: false,
  };

  socios.push(socio);

  afiliacionForm.reset();

  showSuccessMessage('Socio afiliado exitosamente');
});

const pagoForm = document.getElementById('pagoForm');
pagoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const socioId = document.getElementById('socioId').value;
  const monto = document.getElementById('monto').value;

  const socio = socios.find((s) => s.id === parseInt(socioId));

  if (socio) {
    socio.cuotaPagada = true;
    pagoForm.reset();
    showSuccessMessage('Pago registrado exitosamente');
  } else {
    showErrorMessage('Socio no encontrado');
  }
});

const accesoForm = document.getElementById('accesoForm');
accesoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const socioId = document.getElementById('socioId').value;

  const socio = socios.find((s) => s.id === parseInt(socioId));

  if (socio) {
    if (socio.cuotaPagada) {
      socio.accesoPermitido = true;
      showAlert('Acceso permitido');
    } else {
      socio.accesoPermitido = false;
      showAlert('Acceso denegado. Realice el pago de cuotas.');
    }
  } else {
    showErrorMessage('Socio no encontrado');
  }

  accesoForm.reset();
});

function showSuccessMessage(message) {
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-success');
  alert.textContent = message;

  const container = document.querySelector('.container');
  container.insertBefore(alert, container.firstChild);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function showErrorMessage(message) {
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-error');
  alert.textContent = message;

  const container = document.querySelector('.container');
  container.insertBefore(alert, container.firstChild);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function showAlert(message) {
  alert(message);
}

function buscarAfiliado() {
  const input = document.getElementById('buscar-input');
  const query = input.value.trim().toLowerCase();

  const resultados = socios.filter((socio) =>
    socio.nombre.toLowerCase().includes(query)
  );

  mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
  const listaAfiliados = document.getElementById('lista-afiliados');
  listaAfiliados.innerHTML = '';

  resultados.forEach((socio) => {
    const item = document.createElement('li');
    item.textContent = `ID: ${socio.id}, Nombre: ${socio.nombre}`;
    listaAfiliados.appendChild(item);
  });
}

function eliminarAfiliado() {
  const input = document.getElementById('eliminar-input');
  const id = parseInt(input.value);

  const indice = socios.findIndex((socio) => socio.id === id);

  if (indice !== -1) {
    socios.splice(indice, 1);
    input.value = '';
    mostrarResultados(socios);
    showAlert('Afiliado eliminado correctamente');
  } else {
    showAlert('No se encontró un afiliado con el ID proporcionado');
  }
}

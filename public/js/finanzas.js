document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll("button[data-target]");
    const closeButtons = document.querySelectorAll(".modal-close");

    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add("active");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").classList.remove("active");
        });
    });
});

const ctx = document.getElementById('myChart');
let chart = null;
let sueldoBase = 0;

document.getElementById('formSueldoBase').addEventListener('submit', async (e) => {
    e.preventDefault();
    sueldoBase = parseFloat(document.getElementById('sueldoBase').value);
    document.getElementById('sueldoMensual').innerText = sueldoBase;
    alert('Sueldo base guardado exitosamente');
    updateChart();
});

document.getElementById('formIngresos').addEventListener('submit', async (e) => {
    e.preventDefault();
    const monto = parseFloat(document.getElementById('montoIngreso').value);
    const categoria = document.getElementById('categoriaIngreso').value;
    const descripcion = document.getElementById('descripcionIngreso').value;

    const response = await fetch('/api/finanzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'ganancia', monto, categoria, descripcion })
    });

    if (response.ok) {
        alert('Ingreso agregado exitosamente');
        updateChart();
    } else {
        alert('Error al agregar el ingreso');
    }
});

document.getElementById('formGastos').addEventListener('submit', async (e) => {
    e.preventDefault();
    const monto = parseFloat(document.getElementById('montoGasto').value);
    const categoria = document.getElementById('categoriaGasto').value;
    const descripcion = document.getElementById('descripcionGasto').value;

    const response = await fetch('/api/finanzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'gasto', monto, categoria, descripcion })
    });

    if (response.ok) {
        alert('Gasto agregado exitosamente');
        updateChart();
    } else {
        alert('Error al agregar el gasto');
    }
});

async function updateChart() {
    const response = await fetch('/api/finanzas');
    const transactions = await response.json();

    const ingresos = transactions.filter(t => t.tipo === 'ganancia').map(t => t.monto);
    const gastos = transactions.filter(t => t.tipo === 'gasto').map(t => t.monto);

    const totalIngresos = ingresos.reduce((acc, val) => acc + val, 0);
    const totalGastos = gastos.reduce((acc, val) => acc + val, 0);
    const saldoFinal = sueldoBase + totalIngresos - totalGastos;

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sueldo Base', 'Ingresos Extras', 'Gastos', 'Saldo Final'],
            datasets: [{
                label: 'Finanzas',
                data: [sueldoBase, totalIngresos, totalGastos, saldoFinal],
                backgroundColor: ['blue', 'green', 'red', 'purple'],
                borderColor: ['darkblue', 'darkgreen', 'darkred', 'darkpurple'],
                borderWidth: 1.5
            }]
        }
    });
}
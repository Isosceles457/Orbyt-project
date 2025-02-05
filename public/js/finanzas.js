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
    if (isNaN(sueldoBase) || sueldoBase <= 0) {
        alert("Por favor, ingresa un sueldo base válido.");
        return;
    }
    document.getElementById('sueldoMensual').innerText = sueldoBase;
    alert('Sueldo base guardado exitosamente');
    updateChart();
});

document.getElementById('formIngresos').addEventListener('submit', (e) => {
    e.preventDefault();
    handleTransaction('formIngresos', 'ganancia');
});

document.getElementById('formGastos').addEventListener('submit', (e) => {
    e.preventDefault();
    handleTransaction('formGastos', 'gasto');
});

async function handleTransaction(formId, tipo) {
    const form = document.getElementById(formId);
    const monto = parseFloat(form.querySelector('[name="monto"]').value);
    const categoria = form.querySelector('[name="categoria"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    const response = await fetch('/api/finanzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, monto, categoria, descripcion })
    });

    if (response.ok) {
        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} agregado exitosamente`);
        updateChart();
    } else {
        const error = await response.json();
        alert(`Error al agregar ${tipo}: ${error.message || 'Error desconocido'}`);
    }
}

async function updateChart() {
    try {
        const response = await fetch('/api/finanzas');
        if (!response.ok) throw new Error('No se pudo obtener los datos');
        const transactions = await response.json();

        const ingresos = transactions.filter(t => t.tipo === 'ganancia').reduce((acc, val) => acc + val.monto, 0);
        const gastos = transactions.filter(t => t.tipo === 'gasto').reduce((acc, val) => acc + val.monto, 0);
        const saldoFinal = sueldoBase + ingresos - gastos;

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sueldo Base', 'Ingresos Extras', 'Gastos', 'Saldo Final'],
                datasets: [{
                    label: 'Finanzas',
                    data: [sueldoBase, ingresos, gastos, saldoFinal],
                    backgroundColor: ['blue', 'green', 'red', 'purple'],
                    borderColor: ['darkblue', 'darkgreen', 'darkred', 'darkpurple'],
                    borderWidth: 1.5
                }]
            }
        });
    } catch (error) {
        alert(`Error al actualizar el gráfico: ${error.message}`);
    }
}

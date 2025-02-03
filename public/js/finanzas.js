document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll("button[data-target]");
    const closeButtons = document.querySelectorAll(".modal-close");
    
    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target"); // Obtener el valor correcto de data-target
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
const monthSelector = document.getElementById('monthSelector');
let chart = null;

monthSelector.addEventListener('change', async () => {
    const selectedMonth = monthSelector.value;
    const year = new Date().getFullYear(); // Año actual

    // Obtener los datos del backend (MongoDB)
    const response = await fetch(`/api/finanzas/${selectedMonth}/${year}`);
    const transactions = await response.json();

    // Separar las ganancias y los gastos
    const ingresos = transactions.filter(t => t.tipo === 'ganancia').map(t => t.monto);
    const gastos = transactions.filter(t => t.tipo === 'gasto').map(t => t.monto);

    // Crear la gráfica
    if (chart) {
        chart.destroy(); // Destruir la gráfica anterior
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ganancias', 'Gastos'],
            datasets: [{
                label: 'Ganancias',
                data: [ingresos.reduce((acc, val) => acc + val, 0), 0],
                backgroundColor: 'green',
                borderColor: 'darkgreen',
                borderWidth: 1.5
            },
            {
                label: 'Gastos',
                data: [0, gastos.reduce((acc, val) => acc + val, 0)],
                backgroundColor: 'red',
                borderColor: 'darkred',
                borderWidth: 1.5
            }]
        }
    });
});

// Cargar los datos al cargar la página
monthSelector.dispatchEvent(new Event('change'));

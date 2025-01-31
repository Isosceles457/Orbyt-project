// Obtén todos los botones que abren modales
const buttons = document.querySelectorAll('button[data-target]');

// Obtén todos los modales
const modals = document.querySelectorAll('.modal');

// Función para abrir un modal
function openModal(modal) {
    modal.style.display = 'flex'; // Cambia el estilo para mostrar el modal
}

// Función para cerrar un modal
function closeModal(modal) {
    modal.style.display = 'none'; // Cambia el estilo para ocultar el modal
}

// Asignar evento a cada botón para abrir el modal correspondiente
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const targetModal = document.querySelector(`#${this.dataset.target}`);
        if (targetModal) {
            openModal(targetModal);
        }
    });
});

// Asignar evento a cada botón de cierre del modal
modals.forEach(modal => {
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
        closeModal(modal);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('[data-target="modalVerTareas"]').addEventListener("click", async () => {
        try {
            const response = await fetch('../backend/get_tareas.php');
            const tareas = await response.json();
            
            const tabla = document.querySelector("#tablaTareas tbody");
            const mensaje = document.querySelector("#mensajeSinTareas");

            tabla.innerHTML = ""; // Limpiar contenido anterior

            if (tareas.length === 0) {
                mensaje.style.display = "block";
                tabla.parentElement.style.display = "none";
            } else {
                mensaje.style.display = "none";
                tabla.parentElement.style.display = "table";
                tareas.forEach(tarea => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${tarea.nombreTarea}</td>
                        <td>${tarea.descripcionTarea}</td>
                        <td>${tarea.materia}</td>
                        <td>${tarea.fechaEntrega}</td>
                    `;
                    tabla.appendChild(fila);
                });
            }
        } catch (error) {
            console.error("Error obteniendo las tareas:", error);
        }
    });
});
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
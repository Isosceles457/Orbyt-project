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
    button.addEventListener('click', function (event) {
        const targetModal = document.querySelector(`#${this.dataset.target}`);
        if (targetModal) {
            openModal(targetModal);
        }
    });
});

// Asignar evento a cada botón de cierre del modal
modals.forEach(modal => {
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', function () {
        closeModal(modal);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const formAgregarNotas = document.getElementById('formAgregarNotas');
    const formEditarNotas = document.getElementById('formEditarNotas');
    let notes = []; // Definir la variable notes en el ámbito adecuado

    // Fetch and display notes
    const fetchNotes = async () => {
        const response = await fetch('/api/notes');
        if (response.ok) {
            notes = await response.json(); // Asignar las notas a la variable notes
            notesContainer.innerHTML = '';
            notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                    <h3>${note.titulo}</h3>
                    <p>${note.contenido}</p>
                    <button class="edit-note" data-id="${note._id}">Editar</button>
                    <button class="delete-note" data-id="${note._id}">Eliminar</button>
                `;
                notesContainer.appendChild(noteElement);
            });
        } else {
            console.error('Error fetching notes:', response.statusText);
        }
    };

    // Add note
    formAgregarNotas.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('nombreNota').value;
        const contenido = document.getElementById('descripcionNota').value;
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, contenido })
        });
        if (response.ok) {
            fetchNotes();
        } else {
            console.error('Error adding note:', response.statusText);
        }
    });

    // Edit note
    notesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-note')) {
            const id = e.target.dataset.id;
            const note = notes.find(note => note._id === id); // Usar la variable notes
            document.getElementById('editNotaId').value = note._id;
            document.getElementById('editNombreNota').value = note.titulo;
            document.getElementById('editDescripcionNota').value = note.contenido;
            document.getElementById('EditarNotas').style.display = 'block';
        }
    });

    formEditarNotas.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editNotaId').value;
        const titulo = document.getElementById('editNombreNota').value;
        const contenido = document.getElementById('editDescripcionNota').value;
        const response = await fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, contenido })
        });
        if (response.ok) {
            fetchNotes();
        } else {
            console.error('Error editing note:', response.statusText);
        }
    });

    // Delete note
    notesContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-note')) {
            const id = e.target.dataset.id;
            const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchNotes();
            } else {
                console.error('Error deleting note:', response.statusText);
            }
        }
    });

    // Initial fetch
    fetchNotes();
});
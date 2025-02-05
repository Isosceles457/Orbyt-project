document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-target]');
    const modals = document.querySelectorAll('.modal');
    const formGestionarTareas = document.getElementById('formGestionarTareas');
    const formAgregarAsignatura = document.getElementById('formAgregarAsignatura');

    // Función para abrir un modal
    function openModal(modal) {
        modal.style.display = 'flex';
    }

    // Función para cerrar un modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Asignar evento a cada botón para abrir el modal correspondiente
    buttons.forEach(button => {
        button.addEventListener('click', function () {
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

    // Función para agregar una tarea
    formGestionarTareas.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreTarea').value;
        const descripcion = document.getElementById('descripcionTarea').value;
        const materia = document.getElementById('materia').value;
        const fechaEntrega = document.getElementById('fechaEntrega').value;
        const response = await fetch('/api/study/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, descripcion, materia, fechaEntrega })
        });
        if (response.ok) {
            alert('Tarea agregada exitosamente');
            closeModal(document.getElementById('modalGestionarTareas'));
            fetchTareas();
        } else {
            alert('Error al agregar la tarea');
        }
    });

    // Función para agregar una asignatura
    formAgregarAsignatura.addEventListener('submit', async (e) => {
        e.preventDefault();
        const asignatura = document.getElementById('nombreAsignatura').value;
        const dia = document.getElementById('diaAsignatura').value;
        const horaI = document.getElementById('horaInicio').value;
        const horaF = document.getElementById('horaFin').value;
        const response = await fetch('/api/study/horarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ asignatura, dia, horaI, horaF })
        });
        if (response.ok) {
            alert('Asignatura agregada exitosamente');
            closeModal(document.getElementById('modalAgregarAsignatura'));
            fetchHorarios();
        } else {
            alert('Error al agregar la asignatura');
        }
    });

    // Función para obtener y mostrar las tareas
    const fetchTareas = async () => {
        const response = await fetch('/api/study/tareas');
        if (response.ok) {
            const tareas = await response.json();
            const tablaTareas = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];
            tablaTareas.innerHTML = '';
            tareas.forEach(tarea => {
                const row = tablaTareas.insertRow();
                row.innerHTML = `
                    <td>${tarea.nombre}</td>
                    <td>${tarea.descripcion}</td>
                    <td>${tarea.materia}</td>
                    <td>${new Date(tarea.fechaEntrega).toLocaleDateString()}</td>
                    <td><button class="eliminar-tarea" data-id="${tarea._id}" style="background-color: red; color: white;">Eliminar</button></td>
                `;
            });
        } else {
            alert('Error al obtener las tareas');
        }
    };

    // Función para obtener y mostrar los horarios
    const fetchHorarios = async () => {
        const response = await fetch('/api/study/horarios');
        if (response.ok) {
            const horarios = await response.json();
            const tablaHorarios = document.getElementById('tablaHorarios').getElementsByTagName('tbody')[0];
            tablaHorarios.innerHTML = '';
            horarios.forEach(horario => {
                const row = tablaHorarios.insertRow();
                row.innerHTML = `
                <td>${horario.asignatura}</td>
                <td>${horario.dia}</td>
                <td>${horario.horaI} - ${horario.horaF}</td>
                <td><button class="eliminar-horario" data-id="${horario._id}" style="background-color: red; color: white;">Eliminar</button></td>
            `;
            });
        } else {
            alert('Error al obtener los horarios');
        }
    };


    // Asignar eventos a los botones de eliminar
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('eliminar-tarea')) {
            const id = e.target.dataset.id;
            const response = await fetch(`/api/study/tareas/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchTareas();
            } else {
                alert('Error al eliminar la tarea');
            }
        } else if (e.target.classList.contains('eliminar-horario')) {
            const id = e.target.dataset.id;
            const response = await fetch(`/api/study/horarios/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchHorarios();
            } else {
                alert('Error al eliminar el horario');
            }
        }
    });

    // Fetch initial data
    fetchTareas();
    fetchHorarios();
});
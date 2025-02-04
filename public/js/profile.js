document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.success && data.user) {
            // Llenar los campos de nombre, apellido y correo
            document.getElementById('nombre').value = data.user.nombres || '';
            document.getElementById('apellido').value = data.user.apellidos || '';
            document.getElementById('correo').value = data.user.username || '';
            // Dejar el campo de contraseña vacío
            document.getElementById('password').value = ''; // Este campo se deja vacío
        } else {
            alert('Error al cargar el perfil: ' + (data.error || 'Datos no disponibles'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar cargar el perfil.');
    }
});

document.getElementById('profileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación del correo electrónico para asegurarse de que contenga "@"
    if (!correo.includes("@")) {
        alert("Por favor, ingrese un correo válido que contenga '@'.");
        return;
    }

    try {
        const response = await fetch('/api/profile/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido, correo, password }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Perfil actualizado exitosamente');
        } else {
            alert('Error al actualizar el perfil: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar actualizar el perfil.');
    }
});
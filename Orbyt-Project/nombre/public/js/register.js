document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    // Validación: Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Enviar los datos al backend para registrar el usuario
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });


    const data = await response.json();

    if (response.ok) {
        // Si el registro fue exitoso, redirigir al login o mostrar un mensaje
        alert('Usuario registrado con éxito');
        window.location.href = '/login'; // Redirige a la página de login
    } else {
        // Mostrar el error si algo salió mal en el registro
        alert(data.error || 'Hubo un error al registrar el usuario');
    }
});

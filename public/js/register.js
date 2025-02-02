document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nombres = document.querySelector('input[name="nombres"]').value;
    const apellidos = document.querySelector('input[name="apellidos"]').value;
    const fechaNacimiento = document.querySelector('input[name="fechaNacimiento"]').value;
    const email = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Enviar los datos al backend para registrar el usuario
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password, nombres, apellidos, fechaNacimiento }),
    });

    const data = await response.json();

    if (response.ok) {
        // Si el registro fue exitoso, redirigir al login o mostrar un mensaje
        alert('Usuario registrado con éxito');
        window.location.href = '/iniciosesion'; // Redirige a la página de inicio de sesión
    } else {
        // Mostrar el error si algo salió mal en el registro
        alert(data.error || 'Hubo un error al registrar el usuario');
    }
});
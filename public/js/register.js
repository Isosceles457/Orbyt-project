document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let emailInput = document.querySelector("input[name='username']");
    let emailValue = emailInput.value.trim();

    if (!emailValue.includes("@")) {
        alert("Por favor, ingrese un correo válido que contenga '@'.");
        return; // Sale de la función sin continuar con el registro
    }

    // Capturar los valores del formulario
    const nombres = document.querySelector('input[name="nombres"]').value;
    const apellidos = document.querySelector('input[name="apellidos"]').value;
    const fechaNacimiento = document.querySelector('input[name="fechaNacimiento"]').value;
    const email = emailValue;
    const password = document.querySelector('input[name="password"]').value;

    try {
        // Enviar los datos al backend
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password, nombres, apellidos, fechaNacimiento }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Usuario registrado con éxito');
            window.location.href = '/iniciosesion'; // Redirigir al login
        } else {
            alert(data.error || 'Hubo un error al registrar el usuario');
        }
    } catch (error) {
        alert('Error en la conexión con el servidor');
    }
});
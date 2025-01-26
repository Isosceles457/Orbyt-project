document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.querySelector('#email').value; // Cambio aquí
    const password = document.querySelector('#password').value;

    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Si la autenticación es exitosa, almacenar el token
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
    } else {
        // Mostrar error si las credenciales son incorrectas
        alert(data.error);
    }
});

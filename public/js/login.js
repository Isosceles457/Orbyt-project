document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });


        const data = await response.json();

        if (data.success) {
            // Si la autenticación es exitosa, redirigir al dashboard
            window.location.href = '/dashboard';
        } else {
            // Mostrar error si las credenciales son incorrectas
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    let emailInput = document.getElementById("mail");
    let emailValue = emailInput.value.trim();

    if (!emailValue.includes("@")) {
        alert("Por favor, ingrese un correo válido que contenga '@'.");
        return; 
    }

    const password = document.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: emailValue, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            window.location.href = '/dashboard';
        } else {
            alert(data.error || 'Usuario o contraseña incorrectos.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});


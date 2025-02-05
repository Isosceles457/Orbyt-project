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
        showToast("Error", "Por favor, ingrese un correo válido que contenga '@'.", "error");
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
        console.log(data);
        if (data.success) {
            showToast("Success", "Perfil actualizado exitosamente", "success");
        } else {
            showToast("Error", 'Error al actualizar el perfil: ' + data.error, "error");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast("Error", 'Ocurrió un error al intentar actualizar el perfil.', "error");
    }
});

function showToast(title, message, type) {
    const toast = document.querySelector(".toast");
    const toastTitle = toast.querySelector(".text-1");
    const toastMessage = toast.querySelector(".text-2");
    const toastIcon = toast.querySelector(".check");

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    if (type === "success") {
        toastIcon.className = "fas fa-solid fa-check check";
        toastIcon.style.backgroundColor = "#4070f4";
    } else if (type === "error") {
        toastIcon.className = "fas fa-solid fa-xmark check";
        toastIcon.style.backgroundColor = "#f44336";
    }

    toast.classList.add("active");
    document.querySelector(".progress").classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);

    setTimeout(() => {
        document.querySelector(".progress").classList.remove("active");
    }, 5300);
}

document.querySelector(".close").addEventListener("click", () => {
    const toast = document.querySelector(".toast");
    toast.classList.remove("active");
    setTimeout(() => {
        document.querySelector(".progress").classList.remove("active");
    }, 300);
});
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let emailInput = document.getElementById("mail");
    let emailValue = emailInput.value.trim();

    if (!emailValue.includes("@")) {
        showToast("Error", "Por favor, ingrese un correo válido que contenga '@'.", "error");
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
            showToast("Success", "Inicio de sesión exitoso.", "success");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            showToast("Error", data.error || 'Usuario o contraseña incorrectos.', "error");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast("Error", 'Ocurrió un error al intentar iniciar sesión.', "error");
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
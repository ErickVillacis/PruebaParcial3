document.getElementById('loginButton').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

async function login(email, password) {
    // Muestra el indicador de carga
    document.getElementById('loadingOverlay').classList.add('show');

    try {
        const response = await fetch('http://localhost:8080/api/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email,
                'password': password
            })
        });

        const result = await response.json();
        if (result) {
            // Login exitoso
            window.location.href = '/dashboard';
        } else {
            // Error en el login
            document.getElementById('loginAlert').classList.remove('d-none');
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error during login:', error);
        document.getElementById('loginAlert').classList.remove('d-none');
    } finally {
        // Oculta el indicador de carga
        document.getElementById('loadingOverlay').classList.remove('show');
    }
}

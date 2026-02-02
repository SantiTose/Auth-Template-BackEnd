console.log("forgot.js cargado");
const params = new URLSearchParams(window.location.search); // lee a partir de ?token=
const token = params.get('token'); // guarda solo el token lo que esta despues del =

const button = document.getElementById('resetBtn');
const message = document.getElementById('message');

button.addEventListener('click', async () =>{
    const password = document.getElementById('password').value;
    const repeat = document.getElementById('repeat_password').value;

    if (!password || !repeat){
        message.textContent = 'Completa todos los campos';
        return;
    }

    if (password != repeat){
        message.textContent = "Las contraseñas deben coincidir";
        return;
    }

    const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            password
        })
    });

    const data = await response.json();
    message.textContent = data.message;
});


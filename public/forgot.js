console.log("forgot.js cargado");
const button = document.getElementById('recoverBtn');
const message = document.getElementById('message');

button.addEventListener('click', async () => {
    const username = document.getElementById('username').value;

    if (!username) {
        message.textContent = "Ingresa tu usuario";
        return;
    }

    const response = await fetch("http://localhost:3000/forgot-password", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    const data = await response.json();
    message.textContent = data.message;
});

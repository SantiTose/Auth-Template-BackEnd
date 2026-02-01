const express = require('express') // Import express
const app = express(); // Create app
const PORT = 3000; // Set port

app.get('/', (req, res) => { // GET rute
    res.send("Servidor funcionando!");
});

app.listen(PORT, () => { // Start server
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Read forms
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Login rute
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    res.send(`User ${username} | Password: ${password}`)
})

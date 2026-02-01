const express = require('express') // Import express
const bcrypt = require('bcrypt') // Importamos bcrypt
const session = require('express-session') // Importamos sesiones
const db = require('./database') // Importamos db

const app = express(); // Create app
const PORT = 3000; // Set port

// Read html and JSON forms
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => { // GET rute
    res.send("Backend funcionando!");
});

app.listen(PORT, () => { // Start server
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Registrer rute
app.post('/register', async (req, res) =>{
    const { username, password, repeat_password} = req.body;
    if (!username || !password || !repeat_password ){
        return res.send('Faltan datos');
    }
    if (password != repeat_password){
        return res.send('Las contraseñas no coinciden')
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hashea la passwd

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.run(query, [username, hashedPassword], function (err){
        if (err){ // Se verifica si hay errores, si hay entonces el usuario esta registrado
            return res.send('Usuario ya existe');
        }
        res.send('Usuario registrado!');
    });

})

// Login rute
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`;

    db.get(query, [username], async (err, user) =>{
        if (err || !user){
            return res.send('El usuario y la contraseña no coinciden!');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword){
            return res.send('El usuario y la contraseña no coinciden!');
        }
        res.send('Logueado exitosamente!');
    })

    res.send(`User ${username} | Password: ${password}`)
})

app.get('/dashboard', (req, res) =>{
    if (!req.session.userID){
        return res.status(401).send('Not autorized');
    }
    res.send(`Welcome ${req.session.username}`);
})

app.use(session({
    secret: 'che_mogolico_birra_fernet_joda_boliche_cuando_sale', // Firma de la Cookie
    resave: false, // Dont save session if it not change
    saveUninitialized: false, // Ignore empty sessions
}))
// en criollo, mientras el navegador guarde la cookie que se envia
// tu sesion se manteiene abierta

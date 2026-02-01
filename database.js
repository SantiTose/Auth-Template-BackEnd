// verbose mejor manejo de errores
const sqlite3 = require('sqlite3').verbose(); 

// Create or open ./users.db
const db = new sqlite3.Database('./users.db');

// Serialize ejecuta consultas en orden
db.serialize(() => {
    // Creacion de la tabla sino existe
    db.run(`
        CREATE TABLE IF NOT EXIST users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        )
        `);
});

// Se exporta la base para usarla en otros archivos como db
module.exports = db;
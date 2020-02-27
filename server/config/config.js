// ===========================
// Puerto
// ===========================
process.env.PORT = process.env.PORT || 3000

// ===========================
// Entorno
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// Base de datos
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb+srv://cgpera:pelado00@cluster0-a4rjc.mongodb.net/cafe';
    urlDB = 'mongodb+srv://cafe-user:zQV6hRjWVh3kAcGL@cluster0-a4rjc.mongodb.net/cafe';
}
process.env.URLDB = urlDB;
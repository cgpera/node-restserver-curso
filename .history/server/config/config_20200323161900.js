// ===========================
// Puerto
// ===========================
process.env.PORT = process.env.PORT || 3000

// ===========================
// Entorno
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// Vencimiento del token
// ===========================
// 60 seg
// 60 min
// 24 horas
// 30 días
// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED
// ===========================
// SEED es hecha con config de heroku

process.env.SEED = process.env.SEED || 'Este-es-el-seed-desarollo';


// ===========================
// Base de datos
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ===========================
// Google Client ID
// ===========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '16298291178-e237n68m5ql3urqiq6cf2caf5nncclbp.apps.googleusercontent.com'
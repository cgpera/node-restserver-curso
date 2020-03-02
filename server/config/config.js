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
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========================
// SEED
// ===========================
// SEED_PROD es hecha con config de heroku
if (process.env.NODE_ENV === 'dev') {
    SEED = 'Este-es-el-seed-desarrollo';
} else {
    SEED = process.env.SEED_PROD;
}
process.env.SEED = SEED;


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
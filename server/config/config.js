// ========================
// Puerto
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// ========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ========================
// Base de Datos
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://nico:qDDR33u7CSF7YdrI@cluster0.ju8mt.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;
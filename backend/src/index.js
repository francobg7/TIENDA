// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Importar rutas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS   
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Ruta inicial
app.get('/', (req, res) => {
    res.render('login');
});

// Rutas de módulos
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
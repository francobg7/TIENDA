//src/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Ruta de login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Buscar usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token
        const token = user.generateToken();
        res.json({ token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verificar si el usuario está autenticado
router.get('/verify', auth, async (req, res) => {
    if (req.user) {
        res.json({ 
            mensaje: 'Token válido', 
            user: req.user 
        });
    } else {
        res.status(401).json({ 
            error: 'Token inválido' 
        });
    }
});

// Logout (opcional ya que usamos JWT)
router.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logout exitoso' });
});

module.exports = router;
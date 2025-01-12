const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        // Obtener el token del header
        const token = req.header('Authorization').replace('Bearer ', '')
        
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Buscar el usuario
        const user = await User.findById(decoded.id)
        
        if (!user) {
            throw new Error()
        }
        
        // Agregar el usuario a la request
        req.user = user
        next()
        
    } catch (error) {
        res.status(401).json({ error: 'Por favor autentícate' })
    }
}

module.exports = auth
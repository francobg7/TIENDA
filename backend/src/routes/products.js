const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const auth = require('../middleware/auth')

// Ver productos
router.get('/products', async (req, res) => {
    try {
        const productos = await Product.find()
        res.json({ productos })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' })
    }
})

// Crear producto (solo admin)
router.post('/products', auth, async (req, res) => {
    try {
        const producto = await Product.create({
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            size: req.body.size,
            stock: req.body.stock,
            description: req.body.description
        })
        res.status(201).json({ producto })
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto' })
    }
})

// Actualizar producto (solo admin)
router.put('/products/:id', auth, async (req, res) => {
    try {
        const producto = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json({ producto })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' })
    }
})

// Eliminar producto (solo admin)
router.delete('/products/:id', auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ mensaje: 'Producto eliminado' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' })
    }
})

module.exports = router
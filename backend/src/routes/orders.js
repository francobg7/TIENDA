const router = require('express')
const Order = require('../models/order')
const auth = require('../middleware/auth')

// Ver pedidos
router.get('/orders', auth, async (req, res) => {
    try {
        const pedidos = await Order.find().populate('items.product')
        res.json({ pedidos })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pedidos' })
    }
})

// Crear pedido
router.post('/orders', async (req, res) => {
    try {
        const pedido = await Order.create({
            customerInfo: req.body.customerInfo,
            items: req.body.items,
            totalAmount: req.body.totalAmount
        })
        res.status(201).json({ pedido })
    } catch (error) {
        res.status(400).json({ error: 'Error al crear pedido' })
    }
})

// Actualizar pedido
router.put('/orders/:id', auth, async (req, res) => {
    try {
        const pedido = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )
        res.json({ pedido })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar pedido' })
    }
})

// Eliminar pedido
router.delete('/orders/:id', auth, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.json({ mensaje: 'Pedido eliminado' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar pedido' })
    }
})

module.exports = router
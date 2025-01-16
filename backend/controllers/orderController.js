// controllers/orderController.js
const Order = require('../models/Order');

const orderController = {
    // Obtener todos los pedidos
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json({ orders });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo pedido
    createOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            await newOrder.save();
            res.status(201).json({ order: newOrder });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar estado del pedido
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            res.json({ order: updatedOrder });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = orderController;
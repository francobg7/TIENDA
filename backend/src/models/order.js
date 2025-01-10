const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Información del cliente
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    
    // Productos ordenados
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }],

    // Estado del pedido
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },

    // Total del pedido
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true  // Agrega automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Order', orderSchema);
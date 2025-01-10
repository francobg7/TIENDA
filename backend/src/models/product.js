    // src/models/product.js
    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        type: { 
            type: String, 
            required: true,
            enum: ['sneaker', 'remera']
        },
        size: { 
            type: String, 
            required: true 
        },
        stock: { 
            type: Number, 
            required: true,
            default: 0
        },
        description: String
    }, {
        timestamps: true
    });

    module.exports = mongoose.model('Product', productSchema);
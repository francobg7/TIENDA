    // src/models/user.js
    const mongoose = require('mongoose');
    const bcrypyt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    //definimos nuestro Schema de adm y que la comntrasenha y username sean obligatorios
    const userSchema = new mongoose.Schema({
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        }
    });

    //debemos de encriptar la contrasenha antes de guardarla 
    userSchema.pre('save', async function (next) {
        if (this.isModified('password')){
            this.password = await bcrypyt.password(this.password, 10);
        }
        next();
    });    

    //metodo para comparar las contrasenhas
    userSchema.methods.comparePassword = async function (password) {
        return bcrypyt.compare(password, this.password);
    };

    //metodo para generar token JWT
    userSchema.methods.generateToken = async function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
        
    }




    module.exports = mongoose.model('User', userSchema);


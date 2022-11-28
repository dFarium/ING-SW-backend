const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const asambleaSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    tipo:{
        type: String,
        required: true,
        enum: ['Ordinaria','Extraordinaria']
    },
    fecha:{
<<<<<<< HEAD
        type: Date
    },
    archivos: [{
        type: Schema.Types.ObjectId,
        ref: 'archivo',
        default: []
    }]
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('asamblea', asambleaSchema);

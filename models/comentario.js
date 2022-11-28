const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comentarioSchema = new Schema({
    apartado:{
        type: String,
        required: true,
        mainLength:1,
        maxLength: 10000
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    asamblea:{
        type: Schema.Types.ObjectId,
        ref: 'asamblea',
        required: true
    }
})

module.exports = mongoose.model('comentario', comentarioSchema);

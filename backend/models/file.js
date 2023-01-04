const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    asamblea: {
        type:Schema.Types.ObjectId,
        ref: 'asamblea',
        required: true,
        default: null
    }
})

module.exports = mongoose.model('file', fileSchema);
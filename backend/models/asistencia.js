const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const asistenciaSchema = new Schema({
    asamblea: {
        type: Schema.Types.ObjectId,
        ref: 'asamblea',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    asistencia:{
        type: String,
        required: true,
        enum: [
            'Presente',
            'Ausente'
        ]
    }

})

module.exports = mongoose.model('asistencia', asistenciaSchema);
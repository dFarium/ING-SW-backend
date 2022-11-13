const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const asistenciaSchema = new Schema({
    asamblea: [{
        type: Schema.Types.ObjectId,
        ref: 'asamblea'
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
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
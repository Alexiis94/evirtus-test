const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const vulnerabilidadeSchema = new Schema({
    threat_id: {
        type: String
    },
    threat_name: {
        type: String,
        trim: true
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    file_type_extension: {
        type: String,
        trim: true
    },
    counter: {
        type: Number,
        default: 0
    }
});

//exportamos el modelo
module.exports = mongoose.model('Vulnerabilidad', vulnerabilidadeSchema, "vulnerabilidades");
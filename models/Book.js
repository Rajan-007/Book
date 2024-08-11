const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, unique: true },
    status: { type: String, enum: ['AVAILABLE', 'SOLD'], default: 'AVAILABLE' },
});

module.exports = mongoose.model('Book', BookSchema);

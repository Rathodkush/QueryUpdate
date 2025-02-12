
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const QuerySchema = new mongoose.Schema({
    text: { type: String, required: true },
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', QuerySchema);
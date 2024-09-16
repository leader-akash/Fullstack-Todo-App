const mongoose = require("mongoose");

const todo = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timePeriod: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: { // user reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todo);

module.exports = Todo;

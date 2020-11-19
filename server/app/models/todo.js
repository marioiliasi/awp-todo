const mongoose = require("mongoose");
const Schema = require("mongoose/lib/schema");

const toDoItemSchema = new mongoose.Schema(
    {
        _id: Schema.Types.ObjectId,
        text: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        completed: {
            type: Boolean,
            required: false,
        }
    },
    { timestamps: true }
)

const toDoTaskSchema = new mongoose.Schema(
    {
        userId: Schema.Types.ObjectId,
        title: {
            type: String,
            required: true,
        },
        archived: {
            type: Boolean,
            required: false,
        },
        deleted: {
            type: Boolean,
            required: false,
        },
        type: {
            type: String,
            required: true,
            enum: ['note', 'checkbox',]
        },
        items: [toDoItemSchema]
    },
    { timestamps: true }
)

module.exports.TodoItem = mongoose.model('TodoItem', toDoItemSchema, 'todo');
module.exports.TodoTask = mongoose.model('TodoTask', toDoTaskSchema, 'todo');

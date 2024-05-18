import mongoose from "mongoose";

// Define the reminder schema
const reminderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    reminderDateTime: {
        type: Date,
        required: true
    },
    actualDueDate: {
        type: Date,
        required: true
    },
    billName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

// Create or retrieve the Reminder model
const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', reminderSchema);

// Export the Reminder model
module.exports = Reminder;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const billSchema = new Schema({
    billName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    category: {
        type: String
    },
    reminder: {
        type: Date,
        required: false
    }
});

const userBillsSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    bills: [billSchema]  // Embedding the Bill schema in the User schema
});

const BillsModel = mongoose.models.Bills || mongoose.model('Bills', userBillsSchema);
module.exports = BillsModel;

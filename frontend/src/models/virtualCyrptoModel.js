const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each purchase of cryptocurrency
const cryptoPurchaseSchema = new Schema({
  coinId: { type: String, required: true }, // e.g., 'BTC' for Bitcoin
  coinSymbol: { type: String, required: true },
  coinName: { type: String, required: true }, // e.g., 'Bitcoin'
  purchaseDate: { type: Date, default: Date.now }, // Date of purchase
  purchasePrice: { type: Number, required: true }, // Price of crypto at time of purchase
  quantity: { type: Number, required: true }, // Amount of cryptocurrency purchased //
});

const dailyPriceSchema = new Schema({
  coinId: { type: String },
  unit: { type: Number, default: 0 },
  price: { type: Number }
});

// Define the user schema that includes an array of purchases
const userPortfolioSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  transactions: [cryptoPurchaseSchema], // Array of cryptocurrency purchases
  dailyPrice: [dailyPriceSchema]
});

// Create the model from the schema
const UserPortfolio = mongoose.models.VirtualUserPortfolio ||mongoose.model('VirtualUserPortfolio', userPortfolioSchema);

module.exports = UserPortfolio;

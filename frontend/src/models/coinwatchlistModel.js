const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each purchase of cryptocurrency
const cryptowatchlistSchema = new Schema({
  coinId: { type: String, required: true }, // e.g., 'BTC' for Bitcoin
  coinSymbol: { type: String, required: true },
  coinName: { type: String, required: true }, // e.g., 'Bitcoin'
  coinImage:{type:String, required:true},
  coinPrice:{type: Number, required: true}
});

// Define the user schema that includes an array of purchases
const watchlistSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  transactions: [cryptowatchlistSchema] // Array of cryptocurrency purchases
});

// Create the model from the schema
const UserPortfolio = mongoose.models.CoinWatchList ||mongoose.model('CoinWatchList', watchlistSchema);

module.exports = UserPortfolio;

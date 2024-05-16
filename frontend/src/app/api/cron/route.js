import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const users = await UserPortfolio.find();

    // Fetch unique coin IDs from transactions
    const coinIds = new Set(users.flatMap(user => user.transactions.map(transaction => transaction.coinId)));

    // Fetch daily prices for unique coin IDs
    const coinIdsQueryString = Array.from(coinIds).join(',');
    const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIdsQueryString}&vs_currencies=usd`);
    const priceData = await priceResponse.json();


    // Save daily price data to user portfolios
    await Promise.all(users.map(async user => {
      user.dailyPrice=[];
      user.transactions.forEach(transaction => {
        
        const { coinId, quantity } = transaction;
        const price = priceData[coinId]?.usd;
        
        if (price) {

          user.dailyPrice.push({ coinId, unit: quantity, price });
        }
      });
      await user.save(); // Ensure to await the save operation
    }));

    // Return the updated user portfolio information
    const updatedUsers = await UserPortfolio.find();
    return new NextResponse(JSON.stringify({ message: 'Daily price data saved successfully', users: updatedUsers }));
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
  }
}
import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

connect();

export async function GET(request) {
  try {
    const users = await UserPortfolio.find();
    const coinIdSet = new Set();

    users.forEach(user => {
      user.transactions.forEach(transaction => {
        coinIdSet.add(transaction.coinId);
      });
    });

    const uniqueCoinIds = Array.from(coinIdSet);
    console.log('Unique Coin IDs:', uniqueCoinIds);

    // Fetch prices for uniqueCoinIds
    const coinIdsQueryString = uniqueCoinIds.join(',');
    const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIdsQueryString}&vs_currencies=usd`);
    const priceData = await priceResponse.json();

    // Structure prices data
    const prices = uniqueCoinIds.map(coinId => ({
      coinId,
      price: priceData[coinId]?.usd || null // Ensure there is a fallback in case the price is not found
    }));

    console.log('Prices:', prices);

    const userTransactions = users.map(user => ({
      userId: user.userId,
      transactions: user.transactions.map(transaction => ({
        coinId: transaction.coinId,
        quantity: transaction.quantity
      }))
    }));

    return new NextResponse(JSON.stringify({ userTransactions, prices }));
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
  }
}

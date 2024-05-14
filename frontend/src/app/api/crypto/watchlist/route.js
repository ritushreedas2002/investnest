import { connect } from "@/dbConfig/dbConfig";
import coinWatchList from "@/models/coinwatchlistModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();


export async function GET(req) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "userId is required" }), { status: 400 });
        }

        // Attempt to find the user and their watchlist by userId
        const user = await coinWatchList.findOne({ userId: userId });

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Return the watchlist of the found user
        return new NextResponse(JSON.stringify({ message: 'Watchlist retrieved successfully', data: user.transactions }), { status: 200 });
    } catch (error) {
        console.error('Error processing GET request:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}
export async function POST(req) {
    try {
        const { userId, coinId,coinSymbol, coinName,coinImage,coinPrice,coinPrice24Change } = await req.json();

        // Attempt to find the user by userId
        let user = await coinWatchList.findOne({ userId: userId });

        const newTransaction = {
            coinId: coinId,
            coinSymbol:coinSymbol,
            coinName: coinName,
            coinImage:coinImage,
            coinPrice:coinPrice,
            coinPrice24Change:coinPrice24Change
        };
    
        console.log(newTransaction);
        
        if (user) {
            // User exists, append the new transaction
            user.transactions.push(newTransaction);
        } else {
            // No existing user, create a new one
            user = new coinWatchList({
                userId: userId,
                transactions: [newTransaction]
            });
        }

        await user.save();  // Save the user with the new transaction
        return new NextResponse(JSON.stringify({ message: 'Transaction successfully added', data: newTransaction }), { status: 201 });
    } catch (error) {
        console.error('Error processing request:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        // Parsing userId and coinId from the request URL
        const userId = req.nextUrl.searchParams.get('userId');
        const coinId = req.nextUrl.searchParams.get('coinId');

        if (!userId || !coinId) {
            return new NextResponse(JSON.stringify({ message: "userId and coinId are required" }), { status: 400 });
        }

        // Find the user and their watchlist
        const user = await coinWatchList.findOne({ userId: userId });

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Filter out the coin from the watchlist
        const originalLength = user.transactions.length;
        user.transactions = user.transactions.filter(transaction => transaction.coinId !== coinId);

        // Check if any coins were removed
        if (originalLength === user.transactions.length) {
            return new NextResponse(JSON.stringify({ message: "Coin not found in watchlist" }), { status: 404 });
        }

        // Save the updated user document
        await user.save();

        return new NextResponse(JSON.stringify({ message: 'Coin removed from watchlist', data: user.transactions }), { status: 200 });
    } catch (error) {
        console.error('Error processing DELETE request:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}

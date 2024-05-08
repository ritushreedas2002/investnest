import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect(); // Ensure the database connection is established

export async function POST(req) {
    try {
        const { userId, coinId,coinSymbol, coinName, purchaseDate, purchasePrice, quantity } = await req.json();

        // Attempt to find the user by userId
        let user = await UserPortfolio.findOne({ userId: userId });

        const newTransaction = {
            coinId: coinId,
            coinSymbol:coinSymbol,
            coinName: coinName,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
            purchasePrice: purchasePrice,
            quantity: quantity
        };
    
        console.log(newTransaction);
        if (user) {
            // User exists, append the new transaction
            user.transactions.push(newTransaction);
        } else {
            // No existing user, create a new one
            user = new UserPortfolio({
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

export async function GET(request) {
    try {
        //const { userId } = req.query;
        const url = new URL(request.url);
        const email = url.searchParams.get("email");
        // Attempt to find the user by userId
        let user = await UserPortfolio.findOne({ userId: email });

        if (user) {
            // User found, log the portfolio data and return it
            console.log("User portfolio data:", user.transactions);
            return new NextResponse(JSON.stringify({ message: 'User portfolio data retrieved successfully', data: user.transactions }), { status: 200 });
        } else {
            // User not found, return an error message
            return new NextResponse(JSON.stringify({ message: 'User not found', userId: email }), { status: 404 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}

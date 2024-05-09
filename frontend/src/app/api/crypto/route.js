import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connect(); // Ensure the database connection is established

export async function POST(req) {
    try {
        const { userId, coinId, coinSymbol, coinName, purchaseDate, purchasePrice, quantity } = await req.json();

        // Attempt to find the user by userId
        let user = await UserPortfolio.findOne({ userId: userId });

        const newTransaction = {
            coinId: coinId,
            coinSymbol: coinSymbol,
            coinName: coinName,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
            purchasePrice: purchasePrice,
            quantity: quantity
        };

        if (user) {
            // User exists, calculate total quantity for the coin
            const totalQuantity = user.transactions.reduce((acc, transaction) => {
                if (transaction.coinId === coinId) {
                    return acc + transaction.quantity;
                }
                return acc;
            }, 0) + quantity;

            // Check if total quantity exceeds the limit
            if (totalQuantity > 10) {
                return new NextResponse(JSON.stringify({ message: 'Cannot add more than 10 units of this coin' }), { status: 400 });
            }

            // Append the new transaction if it doesn't exceed the limit
            user.transactions.push(newTransaction);
        } else {
            // No existing user, check the initial quantity
            if (quantity > 10) {
                return new NextResponse(JSON.stringify({ message: 'Cannot add more than 10 units of this coin initially' }), { status: 400 });
            }

            // Create a new user portfolio since the initial quantity does not exceed the limit
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

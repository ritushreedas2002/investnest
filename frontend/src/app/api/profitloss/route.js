import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextResponse } from "next/server";


connect();
export async function GET(request) {
    try {
        const users = await UserPortfolio.find();
        const userTransactions = users.map(user => ({
            userId: user.userId,
            transactions: user.transactions.map(transaction => ({
                coinName: transaction.coinName,
                quantity: transaction.quantity
            }))
        }));

        console.log(users);
        return new NextResponse(JSON.stringify(userTransactions));
    }catch(error){
        console.error('Error processing request:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}
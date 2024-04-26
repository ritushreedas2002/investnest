import { connect } from "@/dbConfig/dbConfig";
import TransactionData from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';

connect();
export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, source, amount, date, year, month } = reqBody;

        console.log(reqBody);

        // Check if user exists
        const transactionData = await TransactionData.findOne({ userId: email });
        const newIncomeEntry = { source, amount, date: new Date(date) };

        if (transactionData) {
            // User exists, add the new income under the correct year and month
            const updatePath = `years.${year}.months.${month}.INCOME`;
            await TransactionData.updateOne(
                { userId: email },
                { $push: { [updatePath]: newIncomeEntry } },
                { upsert: true }
            );
            return NextResponse.json({ message: "Income added successfully" }, { status: 200 });
        } else {
            // User does not exist, create a new user with the given details
            const newIncome = new TransactionData({
                userId: email,
                years: {
                    [year]: {
                        months: {
                            [month]: {
                                INCOME: [newIncomeEntry]
                            }
                        }
                    }
                }
            });
            await newIncome.save();
            return NextResponse.json({ message: "New user and income created successfully" }, { status: 201 });
        }
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




export async function DELETE(request) {
    try{
        const reqBody = await request.json()
        const { email, year, month,incomeId} = reqBody;

        const userPath = `years.${year}.months.${month}.INCOME`;
        const result = await TransactionData.updateOne(
            { userId:email }, // Filter to find the correct user
            { $pull: { [userPath]: { _id: new mongoose.Types.ObjectId(incomeId) } } } // Command to remove the specific expense entry
        );

        if (result.modifiedCount === 0) {
            console.log('No income entry was deleted, check your identifiers.');
        } else {
            return NextResponse.json({message:"Income deleted" }, { status: 200 });
        }
        return result;

        
    
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

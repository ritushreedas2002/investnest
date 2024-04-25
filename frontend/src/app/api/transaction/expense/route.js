import { connect } from "@/dbConfig/dbConfig";
import TransactionData from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
connect();

export async function POST(request) {
    try{
        const reqBody = await request.json()
        const { email, title, amount, date, category, year, month } = reqBody;

        console.log(reqBody);

        //check if user exists
        const transactiondata = await TransactionData.findOne({email});
        const Expense = { title, amount, date: new Date(date) };
        if (transactiondata) {
            // User exists, add the new expense under the correct year, month, and category
            const updatePath = `years.${year}.months.${month}.EXPENSE.${category}`;
            await TransactionData.updateOne(
                { userId: email },
                { $push: { [updatePath]:Expense } }
            );
            return NextResponse.json({message:"Expense saved successfully" }, { status: 200 });
        } else {
            // User does not exist, create a new user with the given details
            const newExpense= new TransactionData({
                userId: email,
                years: {
                    [year]: {
                        months: {
                            [month]: {
                                EXPENSE: {
                                    [category]: [Expense]
                                }
                            }
                        }
                    }
                }
            });
            await newExpense.save();
            return NextResponse.json({message:"Expense saved successfully" }, { status: 200 });

    } 
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(request) {
    try{
        const reqBody = await request.json()
        const { email, year, month,expenseId,category,} = reqBody;

        const userPath = `years.${year}.months.${month}.EXPENSE.${category}`;
        const result = await TransactionData.updateOne(
            { userId:email }, // Filter to find the correct user
            { $pull: { [userPath]: { _id: new mongoose.Types.ObjectId(expenseId) } } } // Command to remove the specific expense entry
        );

        if (result.modifiedCount === 0) {
            console.log('No expense entry was deleted, check your identifiers.');
        } else {
            return NextResponse.json({message:"Expense deleted" }, { status: 200 });
        }
        return result;

        
    
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
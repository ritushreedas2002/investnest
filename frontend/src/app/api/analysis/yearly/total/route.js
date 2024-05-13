import { connect } from "@/dbConfig/dbConfig";
import TransactionModel from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

connect(); // Ensure the database connection is established

export async function GET(request) {
    try {
      const url = new URL(request.url);
      const email = url.searchParams.get("email");
      const currentDate = new Date();
      const year = String(currentDate.getFullYear()); // Ensuring year is a string
  
      if (!email) {
        return new NextResponse(JSON.stringify({ message: "Email is required" }), { status: 400 });
      }
  
      const userData = await TransactionModel.findOne({ userId: email });
      if (!userData) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
      }
  
      const yearData = userData.years.get(year);
      if (!yearData) {
        return new NextResponse(JSON.stringify({ message: "Data for the requested year not found" }), { status: 404 });
      }
  
      let totalIncome = 0;
      let totalExpense = 0;
  
      if (yearData.months) {
        yearData.months.forEach((month, monthKey) => {
          if (month.INCOME) {
            month.INCOME.forEach(incomeEntry => {
              totalIncome += incomeEntry.amount;
            });
          }
  
          if (month.EXPENSE) {
            month.EXPENSE.forEach((expenseEntries, category) => {
              expenseEntries.forEach(expenseEntry => {
                totalExpense += expenseEntry.amount;
              });
            });
          }
        });
      }
  
      return new NextResponse(JSON.stringify({ totalIncome, totalExpense }), { status: 200 });
  
    } catch (error) {
      console.error("Error fetching data:", error);
      return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
  }
  
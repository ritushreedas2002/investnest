import { connect } from "@/dbConfig/dbConfig";
import TransactionData from "@/models/transactionModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connect();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return new NextResponse(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Example fixed month for testing, replace as needed

    const transactionData = await TransactionData.findOne({ userId: email });
    if (!transactionData) {
      return new NextResponse(JSON.stringify({ msg: "User Not Found" }), {
        status: 404,
      });
    }

    // Attempt to retrieve month data from the transaction document
    const monthData = transactionData.years.get(String(currentYear))?.months.get(String(currentMonth));

    // Initialize total income and expenses
    let totalIncome = 0;
    let totalExpense = 0;

    if (monthData) {
      // Calculate total income
      monthData.INCOME.forEach(income => {
        totalIncome += income.amount;
      });

      // Calculate total expense
      monthData.EXPENSE.forEach(expenseArray => {
        expenseArray.forEach(expense => {
          totalExpense += expense.amount;
        });
      });
    }

    // Calculate net savings
    const totalSavings = totalIncome - totalExpense;

    return new NextResponse(JSON.stringify({
      month: currentMonth,
      year: currentYear,
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      totalSavings: totalSavings.toFixed(2)
    }), { status: 200 });

  } catch (error) {
    console.error("Error processing GET request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

import { connect } from "@/dbConfig/dbConfig";
import TransactionData from "@/models/transactionModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    if (!email) {
      return new NextResponse(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const transactionData = await TransactionData.findOne({ userId: email });
    if (!transactionData) {
      return new NextResponse(JSON.stringify({ msg: "User Not Found" }), { status: 404 });
    }

    // Get current date and extract year, month, and day
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const today = now.toISOString().split('T')[0]; // Format today's date as "YYYY-MM-DD"

    const yearData = transactionData.years.get(year);
    if (!yearData) {
      return new NextResponse(JSON.stringify({ msg: "No data found for this year" }), { status: 404 });
    }

    const monthData = yearData.months.get(month);
    if (!monthData || !monthData.INCOME) {
      return new NextResponse(JSON.stringify({ msg: "No incomes found for this month" }), { status: 404 });
    }

    let results = [];
    monthData.INCOME.forEach((income) => {
      // Convert income date to "YYYY-MM-DD" and compare to today's date
      const incomeDate = income.date.toISOString().split('T')[0];
      if (incomeDate === today) { // Filter only today's incomes
        results.push({
          source: income.source,
          amount: income.amount,
          date: incomeDate
        });
      }
    });

    // Return the formatted results
    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
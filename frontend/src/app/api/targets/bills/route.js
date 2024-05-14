import { connect } from "@/dbConfig/dbConfig";
import BillsModel from "@/models/billingModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export const dynamic = 'force-dynamic';
connect();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email"); // Correct way to get query parameters in Next.js middleware

    if (!email) {
      return new NextResponse(
        JSON.stringify({ msg: "Email parameter is required" }),
        { status: 400 }
      );
    }
    const user = await BillsModel.findOne({ userId: email });

    if (!user) {
      return new NextResponse(JSON.stringify({ msg: "User Not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ bills: user.bills }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, billname, amount, duedate, paid, category } = reqBody;

    // Convert string to numbers to ensure proper type handling
    const numericGoal = Number(amount);

    // Check if user exists
    let user = await BillsModel.findOne({ userId: email });
    
    const newBill = {
      billName: billname,
      amount: numericGoal,
      dueDate: duedate,
      paid: paid,
      category: category  // Ensure date is handled correctly
    };

    if (user) {
      // User exists, push a new plan to the Plans array
      user.bills.push(newBill);
      await user.save();
      return new NextResponse(
        JSON.stringify({ message: "Bill added to existing user" }),
        { status: 200 }
      );
    } else {
      // User does not exist, create a new user with the new plan
      const newUser = new BillsModel({
        userId: email,
        bills: [newBill],
      });
      await newUser.save();
      return new NextResponse(
        JSON.stringify({ message: "New user created with bill" }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const { email, id, amount, duedate, paid } = reqBody;
    const user = await BillsModel.findOne({
      userId: email,
      "bills._id": new mongoose.Types.ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({ message: "User or bills not found" });
    }

    // Find the specific plan and update it
    const plan = user.bills.id(id);
    if (!plan) {
      return res.status(404).json({ message: "Bill not found" });
    }
    const numericAmt = Number(amount);
    const ddate = new Date(duedate);
    // Update the current amount and recalculate the achieved percentage
    plan.amount=numericAmt;
    plan.dueDate=ddate;
    plan.paid=paid;

    // Save the user document
    await user.save();
    console.log(user);
    return new NextResponse(JSON.stringify({ mag: "Updated Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


export async function DELETE(request) {
  try {
    const reqBody = await request.json();
    const { email, id } = reqBody;
    const billObjectId = new mongoose.Types.ObjectId(id);
    // Check if user exists
    const result = await BillsModel.updateOne(
      { userId: email },
      { $pull: { bills: { _id: billObjectId } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No bill found with the given ID or user does not exist." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Bill Deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

import { connect } from "@/dbConfig/dbConfig";
import PlanningModel from "@/models/planningModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export const dynamic = 'force-dynamic';
connect(); // Ensure your MongoDB connection is handled appropriately.

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
    const user = await PlanningModel.findOne({ userId: email });

    if (!user) {
      return new NextResponse(JSON.stringify({ msg: "User Not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ plans: user.Plans }), {
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
    const { email, title, goal, currentamt, color, date } = reqBody;

    // Convert string to numbers to ensure proper type handling
    const numericGoal = Number(goal);
    const numericCurrentAmt = Number(currentamt);

    // Check if user exists
    let user = await PlanningModel.findOne({ userId: email });
    let achieved = 0;
    if (numericGoal > 0) {
      // Avoid division by zero and calculate the achieved percentage
      achieved = parseFloat(((numericCurrentAmt / numericGoal) * 100).toFixed(2));
    }
    const newPlan = {
      Title: title,
      GoalTarget: numericGoal,
      CurrentAmount: numericCurrentAmt,
      Achieved: achieved,
      Color: color,
      Date: new Date(date)  // Ensure date is handled correctly
    };

    if (user) {
      // User exists, push a new plan to the Plans array
      user.Plans.push(newPlan);
      await user.save();
      return new NextResponse(
        JSON.stringify({ message: "Plan added to existing user" }),
        { status: 200 }
      );
    } else {
      // User does not exist, create a new user with the new plan
      const newUser = new PlanningModel({
        userId: email,
        Plans: [newPlan],
      });
      await newUser.save();
      return new NextResponse(
        JSON.stringify({ message: "New user created with plan" }),
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
    const { email, id, currentamt,color } = reqBody;
    const user = await PlanningModel.findOne({
      userId: email,
      "Plans._id": new mongoose.Types.ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({ message: "User or plan not found" });
    }

    // Find the specific plan and update it
    const plan = user.Plans.id(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    const numericCurrentAmt = Number(currentamt);
    // Update the current amount and recalculate the achieved percentage
    plan.Color=color,
    plan.CurrentAmount += numericCurrentAmt;
    if (plan.GoalTarget > 0) {
      plan.Achieved = parseFloat(
        ((plan.CurrentAmount / plan.GoalTarget) * 100).toFixed(2)
      );
    }

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
    const planObjectId = new mongoose.Types.ObjectId(id);
    // Check if user exists
    const result = await PlanningModel.updateOne(
      { userId: email },
      { $pull: { Plans: { _id: planObjectId } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No plan found with the given ID or user does not exist." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Plan Deleted successfully" },
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

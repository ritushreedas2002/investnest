import { connect } from "@/dbConfig/dbConfig";
import Reminder from "@/models/reminderModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(req) {
    try {
        // Parse the request body to JSON
        const body = await req.json();

        // Extract the required fields from the request body
        const { email, reminderDateTime, actualDueDate, billName, amount } = body;

        // Create a new Reminder instance
        const reminder = new Reminder({ email, reminderDateTime, actualDueDate, billName, amount });

        // Save the reminder to the database
        await reminder.save();

        // Return a success response
        return new NextResponse(JSON.stringify({ message: 'Reminder successfully added', data: reminder }), { status: 200 });
    } catch (error) {
        // Handle any errors
        console.error('Error saving reminder:', error);
        return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
    }
}

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connect(); 

export async function POST(request) {
    try {
        console.log(request);
        return NextResponse.json({ fulfillmentText:"Hello" }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
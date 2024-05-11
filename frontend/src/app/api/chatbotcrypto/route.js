import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";
import TransactionModel from "@/models/transactionModel";


connect(); 

export async function POST(request) {
    try {
        const url = new URL(request.url);
         const email = url.searchParams.get("email");

         if (!email) {
            return new NextResponse(
              JSON.stringify({ message: "Email is required" }),
              { status: 400 }
            );
          }

        return NextResponse.json({ 
            message: "Hello",
        }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
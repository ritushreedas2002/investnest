import { connect } from "@/dbConfig/dbConfig";
import UserPortfolio from "@/models/virtualCyrptoModel";
import { NextResponse } from "next/server";

connect();
export async function GET(request){
  try{

    const url = new URL(request.url);
    const email = url.searchParams.get("email"); // Correct way to get query parameters in Next.js middleware

    if (!email) {
      return new NextResponse(
        JSON.stringify({ msg: "Email parameter is required" }),
        { status: 400 }
      );
    }

    const price=await UserPortfolio.findOne({userId:email});
    return  new NextResponse(JSON.stringify({ message: 'successfully', daily:price.dailyPrice}), { status: 500 });


  }catch(error){
    console.error('Error processing request:', error);
      return new NextResponse(JSON.stringify({ message: 'Failed to process request', error: error.toString() }), { status: 500 });
  }
}

  
  
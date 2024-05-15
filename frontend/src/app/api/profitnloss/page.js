import { NextResponse } from 'next/server';
import { profits } from '../../data/profit'; // This would be your database or in-memory store

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { totalProfit } = reqBody;

    // Retrieve email from localStorage (assuming it's available on the client-side)
    const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: 'Email is required' }),
        { status: 400 }
      );
    }

    const existingProfit = profits.find(p => p.email === email);
    if (existingProfit) {
      existingProfit.totalProfit = totalProfit;
    } else {
      profits.push({ email, totalProfit });
    }

    return new NextResponse(
      JSON.stringify({ message: 'Profit updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    // Retrieve email from localStorage (assuming it's available on the client-side)
    const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: 'Email is required' }),
        { status: 400 }
      );
    }

    const userProfit = profits.find(p => p.email === email);
    if (userProfit) {
      return new NextResponse(JSON.stringify(userProfit), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: 'Profit not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error processing GET request:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function handler(request) {
  if (request.method === 'POST') {
    return POST(request);
  } else if (request.method === 'GET') {
    return GET(request);
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'Method not allowed' }),
      { status: 405 }
    );
  }
}

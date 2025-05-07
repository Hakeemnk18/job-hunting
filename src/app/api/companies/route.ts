
import { NextResponse } from "next/server";
import Company from "@/models/company";
import connectDb from "@/lib/mongodb";

export async function GET() {
  console.log("inside get co")
  try {
    await connectDb(); 
    const companies = await Company.find({ isActive: true });
    return NextResponse.json({ data: companies });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies", details: error },
      { status: 500 }
    );
  }
}
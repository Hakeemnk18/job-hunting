
import { NextResponse, NextRequest } from "next/server";
import Company from "@/models/company";
import connectDb from "@/lib/mongodb";

export async function GET() {
  // console.log("inside get co")
  try {
    await connectDb(); 
    const companies = await Company.find({ isActive: true });
    console.log(companies)
    return NextResponse.json({ data: companies });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  
  try {
    await connectDb(); 
    console.log("inside add company")
    const data = await req.json()
    const company = new Company({
      name: data.name,
      type: data.type,
    })
    await company.save()
    return NextResponse.json({ message: "add company"});
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to fetch companies", details: error },
      { status: 500 }
    );
  }
}
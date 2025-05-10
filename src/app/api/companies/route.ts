
import { NextResponse, NextRequest } from "next/server";
import Company from "@/models/company";
import connectDb from "@/lib/mongodb";

export async function GET() {
  // console.log("inside get co")
  try {
    await connectDb(); 
    const companies = await Company.find({ isActive: true });
    const formattedCompanies = companies.map((company) => ({
      id: company._id.toString(),
      name: company.name,
      type: company.type,
      avatar: company.avatar,
    }));
    // console.log(formattedCompanies)
    return NextResponse.json(formattedCompanies);
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
    const oldCompany = await Company.findOne({name:data.name})
    if(oldCompany){

      return NextResponse.json(
        { message: "company already exist"},
        { status: 500 }
      );
    }
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

export async function PUT(req:NextRequest){
  try {
    const data = await req.json()
    if (data.action === 'deactivate') {
      // Soft delete
      await Company.findByIdAndUpdate(data.id, { $set: { isActive: false } });
      return NextResponse.json({ message: 'Company deactivated' });
    } else if (data.action === 'edit') {
      // Edit logic
      const { id, name, type } = data;
      await Company.findByIdAndUpdate(id, { $set: { name, type } });
      return NextResponse.json({ message: 'Company updated' });
    }

    return NextResponse.json({ message: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch companies", details: error },
      { status: 500 }
    );
  }
}